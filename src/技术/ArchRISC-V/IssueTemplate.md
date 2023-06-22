# IssueTemplate

## Issue

Hello, I'm from ArchRISC-V Team, a community porting Arch Linux software to RISC-V architecture.

### Porting records

#### First attempt

##### Description

While packaging `libopenraw`, we found an error.

##### Error information

```bash
checking build system type... ./config.guess: unable to guess system type
This script, last modified 2009-11-20, has failed to recognize
the operating system you are using. It is advised that you
download the most up to date version of the config scripts from
  http://git.savannah.gnu.org/gitweb/?p=config.git;a=blob_plain;f=config.guess;hb=HEAD
and
  http://git.savannah.gnu.org/gitweb/?p=config.git;a=blob_plain;f=config.sub;hb=HEAD
If the version you run (./config.guess) is already up to date, please
send the following data and any information you think might be
pertinent to <config-patches@gnu.org> in order to provide the needed
information to handle your system.

config.guess timestamp = 2009-11-20

uname -m = riscv64
uname -r = 5.18.7-arch1-1
uname -s = Linux
uname -v = #1 SMP PREEMPT_DYNAMIC Sat, 25 Jun 2022 20:22:01 +0000

/usr/bin/uname -p = unknown
/bin/uname -X     =

hostinfo               =
/bin/universe          =
/usr/bin/arch -k       =
/bin/arch              =
/usr/bin/oslevel       =
/usr/convex/getsysinfo =

UNAME_MACHINE = riscv64
UNAME_RELEASE = 5.18.7-arch1-1
UNAME_SYSTEM  = Linux
UNAME_VERSION = #1 SMP PREEMPT_DYNAMIC Sat, 25 Jun 2022 20:22:01 +0000
configure: error: cannot guess build type; you must specify one
```

##### Solved

- Added `autoreconf` in the `prepare()` function in the PKGBUILD. Here is the code:

```bash
autoupdate
autoreconf -fiv
```

#### Second attempt

##### Description

Then we got a second error, and it is a bash script syntax error:

##### Error information

```bash
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
./configure: line 17110: syntax error near unexpected token `noext,mandatory'
./configure: line 17110: `AX_CXX_COMPILE_STDCXX_14(noext,mandatory)'
```

##### Solved

- looking up some docs, know that this is a error about m4 file, which is complaining the macro `AX_CXX_COMPILE_STDCXX_14` not defined.(in other words, is complaining the macro source file is not found.)
- Downloaded the m4 macros and patched it into source.

#### Third attempt

##### Description

After passing `line 17110`, we got the third error.

It seemed the same as the second.

##### Error information

```bash
./configure: line 19399: syntax error near unexpected token \`-fvisibility=hidden'
./configure: line 19399: `AX_APPEND_COMPILE_FLAGS(-fvisibility=hidden)'
```

##### Unsolved

- We not solve this error, because we are strange about the similar error: second and third. Looking for some docs, found that it probably was a BUG of low version `autotools`. Because our team member encountered the same problem when porting a package called `imagescan`.
- So our team gives this advice.

### Advice

- Please consider updating the configure script tools(Especially `config.guess` file). As part of our duty, we do suggest our upstreams doing this once and for all instead.
- We are searching ways to solve the trouble caused by `autotools` bug. If upstream makes configure tools updated, please leave a comment to notify us and out team will try to port it again to find out whether low version of `autotools` makes it failed or not.

- If upstream wants to reproduce this `libopenraw` issue, please follow [this doc](https://github.com/felixonmars/archriscv-packages/wiki/Setup-Arch-Linux-RISC-V-Development-Environment).



Sincerely thanks.

:)



## Email


Hello, I'm from ArchRISC-V Team, a community porting Arch Linux software to RISC-V architecture. 

### Description

- While packaging `httrack`, we found an [error](https://archriscv.felixc.at/.status/log.htm?url=logs/httrack/httrack-3.49.2-4.log). 

(This link is the log about building processing our lord maintained.) 

- The `config.guess` file is too old to work. 

- So our team gives this advice. 

### Advice

- You can find the patch [here](https://github.com/felixonmars/archriscv-packages/wiki/%E6%88%91%E4%BB%AC%E7%9A%84%E5%B7%A5%E4%BD%9C%E4%B9%A0%E6%83%AF#configguess-unable-to-guess-system-type) that how we fix it. 

- Or just see the patch below.(in ArchLinux PKGBUILD file):

```diff
Some Diff
```

- Please consider updating the configure script tools (Especially `config.guess` file). As part of our duty, we do suggest our upstreams doing this once and for all instead. 

Sincerely thanks. :) 

Arch Linux RISC-V Team,

TinySnow