# PWNCollegeSolutions

## Prenote

- Personal solutions, that is saying maybe not the best.
- **Because the required random value of each user is different, so using `${random}` key word instead of detailed value.**
  - `${random_key}` is the key.
  - `${random_value}` is the corresponding value.
  - etc.
- When first enter a new level, maybe need to execute the level program purely to get the specifically random value before coding any solutions.

## Program Interaction

### Solutions

1. Execute directly.

2. Input `${random}`.

3. `/challenge/embryoio_level3 ${random}`

4. ```bash
   export ${random_key}=${random_value}
   /challenge/embryoio_level4
   ```
   
5. ```bash
   vim /tmp/${random_filename}
   # input: ${random}
   # or
   # use sed/echo to input without interaction.
   /challenge/embryoio_level5 < /tmp/${random_input_filename}
   ```

6. ```bash
   /challenge/embryoio_level6 > /tmp/${random_output_filename}
   cat /tmp/${random_output_filename}
   ```

7. `env -i /challenge/embryoio_level7`

8. ```bash
   echo "/challenge/embryoio_level8" > ./tmp.sh
   bash tmp.sh
   ```

9. ```bash
   echo "/challenge/embryoio_level9" > ./tmp.sh
   bash tmp.sh
   # input: ${random}
   ```

10. ```bash
    echo "/challenge/embryoio_level10 ${random}" > ./tmp.sh
    bash tmp.sh
    ```

11. ```bash
    echo -e "export ${random_key}=${random_value}\n/challenge/embryoio_level11" > ./tmp.sh
    bash tmp.sh
    ```

12. ```bash
    echo -e "echo '${random}' > /tmp/${random_input_filename}\n/challenge/embryoio_level12 < /tmp/${random_input_filename}" > ./tmp.sh
    bash tmp.sh
    ```

13. ```bash
    echo -e "/challenge/embryoio_level13 > /tmp/${random_output_filename}\ncat /tmp/${random_output_filename}" > ./tmp.sh
    bash tmp.sh
    ```

14. ```bash
    echo "env -i /challenge/embryoio_level14" > ./tmp.sh
    bash tmp.sh
    ```

15. ```bash
    ipython
    import subprocess
    subprocess.Popen("/challenge/embryoio_level15")
    ```
    
16. ```bash
    ipython
    import subprocess
    subprocess.run("/challenge/embryoio_level16")
    ${random}
    ```

17. ```bash
    ipython
    import subprocess
    subprocess.run(["/challenge/embryoio_level17","${random}"])
    ```

18. ```bash
    ipython
    import os,subprocess
    os.environ["${random_key}"] = "${random_value}"
    subprocess.run("/challenge/embryoio_level18")
    ```

19. ```bash
    echo "${random}" > /tmp/${random_input_filename}
    ipython
    import subprocess
    subprocess.run("/challenge/embryoio_level19",stdin=open("/tmp/${random_input_filename}"))
    ```

20. ```bash
    ipython
    import subprocess
    subprocess.run(["touch /tmp/${random_output_filename}"],shell=True)
    subprocess.run("/challenge/embryoio_level20",stdout=open("/tmp/${random_output_filename}","w"))
    ```

21. ```bash
    ipython
    import subprocess
    subprocess.run("/challenge/embryoio_level21",env=dict())
    ```

22. ```bash
    echo -e "import subprocess\n\
    subprocess.run('/challenge/embryoio_level22')" > tmp.py
    python tmp.py
    ```

23. ```bash
    echo -e "import subprocess\n\
    subprocess.run('/challenge/embryoio_level23')" > tmp.py
    python tmp.py
    ${random}
    ```

24. ```bash
    echo -e "import subprocess\n\
    subprocess.run(['/challenge/embryoio_level24','${random}'])" > tmp.py
    python tmp.py
    ```

25. ```bash
    echo -e "import os,subprocess\n\
    os.environ['${random_key}'] = '${random_value}'\n\
    subprocess.run('/challenge/embryoio_level25')\
    " > tmp.py
    python tmp.py
    ```

26. ```bash
    echo -e "import subprocess\n\
    subprocess.run(['echo edlmbfok > \
    /tmp/${random_input_filename}'],shell=True)\n\
    subprocess.run('/challenge/embryoio_level26',\
    stdin=open('/tmp/${random_input_filename}'))\
    " > tmp.py
    python tmp.py
    ```

27. ```bash
    echo -e "import subprocess\n\
    subprocess.run(['touch /tmp/${random_output_filename}'],shell=True)\n\
    subprocess.run('/challenge/embryoio_level27',\
    stdout=open('/tmp/${random_output_filename}','w'))\
    " > tmp.py
    python tmp.py
    cat /tmp/${random_output_filename}
    ```

28. ```bash
    echo -e "import subprocess\n\
    subprocess.run('/challenge/embryoio_level28',env=dict())\
    " > tmp.py
    python tmp.py
    ```

29. ```bash
    vim tmp.c
    # input content
    vim tmp.sh
    # input content
    # or
    # using "echo -e 'gcc ~/tmp.c -o ~/tmp\n~/tmp' > tmp.sh" instead.
    bash tmp.sh
    ```
    
    - tmp.c (Template for all levels about c below) :
    
    ```c
    #include <unistd.h>
    #include <sys/types.h>
    #include <sys/wait.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdio.h>
    void pwncollege(){
            return;
    }
    int main(int argc,char *argv[]){
            pid_t pid = fork();
            if(pid < 0){
                exit(-1);
            }else if(pid == 0){
            	execl("/challenge/embryoio_level29","embryoio_level29",NULL)
            }else{
                waitpid(pid,NULL,0);
            }
            return 0;
    }
    ```
    
    - tmp.sh
    
    ```bash
    gcc ~/tmp.c -o ~/tmp
    ~/tmp
    ```
    
30. ```bash
    # the same as level29.
    # need to modify tmp.c to correct "level29" into "level30".
    # into vim, and input:
    :s/29/30/g
    # then execute the bash script:
    bash tmp.sh
    # input the specifically value
    ${random}
    ```

31. ```bash
    :s/30/31/g
    # modify tmp.c:
    execl("/challenge/embryoio_level31","embryoio_level31",${random},NULL)
    # continue the flow
    bash tmp.sh
    ```
    
32. ```bash
    :s/31/32/g
    # modify tmp.c to add one line above the execl() funtion:
    putenv("${random_key}=${random_value}");
    # continue the flow
    bash tmp.sh
    ```

33. ```bash
    echo "${random}" > /tmp/${random_input_filename}
    # modify tmp.c to add one line above the execl() funtion:
    freopen("/tmp/${random_input_filename}","r",stdin);
    # correct the level number
    :s/32/33/g
    # continue the flow
    bash tmp.sh
    ```

34. ```bash
    # modify tmp.c to add one line above the execl() funtion:
    freopen("/tmp/${random_output_filename}","w",stdout);
    # correct the level number
    :s/33/34/g
    # continue the flow
    bash tmp.sh
    cat /tmp/${random_output_filename}
    ```

35. ```bash
    :s/34/35/g
    # modify tmp.sh at second line to below:
    env -i ~/tmp
    # continue the flow
    bash tmp.sh
    ```

36. `/challenge/embryoio_level36 | cat`

37. `/challenge/embryoio_level37 | grep pwn`

38. `/challenge/embryoio_level38 | sed b`

39. `/challenge/embryoio_level39 | rev | rev`

40. `cat | /challenge/embryoio_level40` then input `${random}`

41. `for (( i=0; i<90000; i=i+1 )); do echo -e "${random_reversed}" >> huge.txt; done && rev huge.txt | /challenge/embryoio_level41`

42. ```bash
    bash tmp.sh
    ```
    - tmp.sh
    
    ```bash
    set -Eeuxo pipefail
    /challenge/embryoio_level42 | cat
    ```

43. ```bash
    # tmp.sh
    /challenge/embryoio_level43 | grep pwn
    # execute
    bash tmp.sh
    ```

44. ```bash
    # tmp.sh
    /challenge/embryoio_level44 | sed b
    # execute
    bash tmp.sh
    ```

45. ```bash
    # tmp.sh
    /challenge/embryoio_level45 | rev | rev
    # execute
    bash tmp.sh
    ```

46. ```bash
    # tmp.sh
    cat | /challenge/embryoio_level46
    # execute
    bash tmp.sh
    ```

47. ```bash
    # tmp.sh
    for (( i=0; i<20000; i=i+1 )); do
           echo -e "${random_reversed}" >> huge.txt
    done
    rev huge.txt | /challenge/embryoio_level47
    # execute
    echo "${random_reversed}" > huge.txt
    bash tmp.sh
    ```

48. 



### Confusing Question Numbers

- 7
- 15
- 21



### TODO

- Use `sed` to replace all the interaction steps ( `vim` etc. )



## Program Misuse

### Solutions

1. `cat /flag`

2. `more /flag`

3. `less /flag`

4. `tail /flag`

5. `head /flag`

6. `sort /flag`

7. `vim /flag`

8. `emacs /flag`

9. `nano /flag`

10. `rev /flag | rev`

11. `od -c -w1024 /flag | awk -F" " -v OFS='' '{$1="";print $0}'` or `od -c -w1024 /flag | sed -Ee 's/[0-9]{7}//;s/ //g'`
    - `man od` or `od --help` can peek the usage of `od`
      - `-c` same as `-t c`,  select printable characters or backslash escapes
      - `-w[BYTES]`, `--width[=BYTES]`, output BYTES bytes per output line; 32 is implied when BYTES is not specified
    - `awk` is a column based data filter
      - `-F`, `--field-separator fs`, set the `FS` variable to `fs`, using `fs` to split input content, so here is `space`
      - `-v var=val`, `--assign var=val`, set the variable `var` to the value `val` *before* execution of the program begins. `OFS` is output-field-separator, so here using `null` to reformat the output
      - `'{$1="";print $0}'` is the command
        - First, let the first column be `null`
        - Second, print all the columns
    - `sed` is a stream editor
      - `-E`, use extended regular expressions
      - `-e`, execute multiple `sed` commands
      - `'s/[0-9]{7}//;s/ //g'`
        - `s/[0-9]{7}//` delete the offset address displayed number
        - `s/ //g` delete all the whitespaces
    
12. `hd /flag | awk '{print $(NF)}' | tr -d '\n' | sed -Ee 's/\|//g;s/\.[0-9]{8}/\n/'`
    - `awk` part
      - use the last column
    - `tr`, translate, squeeze, and/or delete characters
      - remove all the `Enter(\n)`
    - `sed` part
      - delete all the `|` characters
      - transform all `.XXXXXXXX` pattern (`X` is one number) into a `Enter(\n)`
    
13. `xxd /flag | awk '{print $(NF)}' | tr -d '\n' | sed 's/\.$/\n/'`

14. `base32 /flag | base32 -d`

15. `base64 /flag | base64 -d`

16. `split /flag | cat ./xaa`

17. `gzip -c /flag | zcat`

18. `bzip2 -c /flag | bzcat`

19. `zip - /flag | zcat`

20. `tar -cvf - /flag | cat`

21. ```bash
    ar -rvs ~/tmp.a /flag; ar -x ~/tmp.a flag; cat flag
    # then remove files
    rm -rf tmp.a flag
    ```

22. `echo "/flag" | cpio -ov > flag.cpio && cat flag.cpio`

23. `genisoimage -sort /flag -o - /flag` **EXTREMELY HARD**
    Related explain in confusing numbers.

24. `env -i cat /flag`

25. `find / -maxdepth 1 -name flag -exec cat {} \;`

26. `echo -e "ans: /flag\n\tcat /flag" > Makefile && make`

27. `nice cat /flag`

28. `timeout 1000 cat /flag`

29. `stdbuf -o L cat /flag`

30. `setarch x86_64 -v cat /flag`

31. `watch -x cat /flag`

32. `socat - /flag`

33. `whiptail --textbox /flag 20 60`

34. `awk '{print $0}' /flag`

35. `sed -n 'p' /flag`

36. ```bash
    ed /flag
    .
    q
    ```

37. `chown -v hacker /flag && cat /flag`

38. `chmod 444 /flag && cat /flag`

39. `cp -v --no-preserve=all /flag ./flag && cat ./flag && rm -rf ./flag`

40. `placeholder`

41. `perl -e 'open(FILE,"</flag");$line=<FILE>;foreach ($line){print $_;}'`

42. `python -c 'print(open("/flag").read())'`

43. `echo 'puts File.read("/flag")' > test.rb && /usr/bin/ruby test.rb && rm -rf test.rb`

44. `placeholder`

45. `date -f /flag`

46. `dmesg -F /flag`

47. `wc --files0-from=/flag`

48. `placeholder`

49. `as @/flag`

50. 

### Confusing Question Numbers

- 17
- **20** ( really confused )
- 23
  - `genisoimage --help 2>&1 | grep FILE`
  - [https://www.youtube.com/watch?v=14mIjpOXnrM&t=733](https://www.youtube.com/watch?v=14mIjpOXnrM&t=733)