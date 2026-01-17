import sys
import subprocess
import time
import threading
import os
import signal

def stream_reader(pipe, output_file, last_activity_container):
    """Reads from pipe and writes to output_file, updating last activity time."""
    try:
        while True:
            # Read chunk (byte by byte or small buffer to be responsive)
            chunk = pipe.read(1)
            if not chunk:
                break
            last_activity_container[0] = time.time()
            output_file.write(chunk)
            output_file.flush()
    except (ValueError, IOError):
        pass

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 timeout_guard.py <idle_timeout_seconds> <command...>", file=sys.stderr)
        sys.exit(1)

    try:
        timeout_sec = float(sys.argv[1])
    except ValueError:
        print("Error: timeout must be a number", file=sys.stderr)
        sys.exit(1)

    cmd = sys.argv[2:]
    
    # Last activity timestamp container (list for mutability in threads)
    last_activity = [time.time()]
    
    # Start subprocess
    # bufsize=0 unbuffered to ensure we see data immediately
    proc = subprocess.Popen(
        cmd,
        stdin=None, # Inherit stdin directly
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        bufsize=0
    )

    # Threads to forward stdout and stderr
    t_out = threading.Thread(target=stream_reader, args=(proc.stdout, sys.stdout.buffer, last_activity))
    t_err = threading.Thread(target=stream_reader, args=(proc.stderr, sys.stderr.buffer, last_activity))
    
    t_out.daemon = True
    t_err.daemon = True
    
    t_out.start()
    t_err.start()

    # Monitor loop
    while proc.poll() is None:
        time.sleep(1)
        idle_time = time.time() - last_activity[0]
        if idle_time > timeout_sec:
            print(f"\n[timeout_guard] No output for {timeout_sec} seconds. Killing process...", file=sys.stderr)
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
            sys.exit(124) # Standard timeout exit code

    sys.exit(proc.returncode)

if __name__ == "__main__":
    main()
