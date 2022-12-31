# SVT-HEVC

## 错误排查

和 `SVT-VP9` 几乎差不多，只改了一个包名字，故详见 `SVT-VP9` 排错日志。

## Issue 上报

Hello, I'm from ArchRISC-V Team, a community porting Arch Linux software to RISC-V architecture.

### Description

When post `SVT-HEVC`, we encountered compile error. Looking up the log, we found `immintrin.h` head file, which leaded this fail.

After searching some docs, we got a depressed truth: it seems that this head file is for `x86_64` only.

Are there some alternatives for it?

### Perhaps useful links

- https://github.com/suijingfeng/vkQuake3/issues/14#issuecomment-674390549
- https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=262910#c3
- https://www.betamaster.us/blog/?p=1922

### Last

If alternatives don't exist, you can give me some advice about the build process or something else.

Sincerely thanks.

:)

### Appendix: Failed log

```console
-- The C compiler identification is GNU 11.2.0
-- The ASM_NASM compiler identification is NASM
-- Found assembler: /usr/bin/nasm
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- CMAKE_BUILD_TYPE = 
-- CMAKE_C_COMPILER = /usr/bin/cc
-- CMAKE_ASM_NASM_COMPILER = /usr/bin/nasm
-- CMAKE_AR = /usr/bin/ar
-- CMAKE_RANLIB = /usr/bin/ranlib
-- CMAKE_INSTALL_PREFIX = /usr
-- Performing Test C_FLAG_Wall
-- Performing Test C_FLAG_Wall - Success
-- Performing Test C_FLAG_Wextra
-- Performing Test C_FLAG_Wextra - Success
-- Performing Test C_FLAG_Wformat
-- Performing Test C_FLAG_Wformat - Success
-- Performing Test C_FLAG_Wformat_security
-- Performing Test C_FLAG_Wformat_security - Success
-- Performing Test C_FLAG_fPIE
-- Performing Test C_FLAG_fPIE - Success
-- Performing Test C_FLAG_fPIC
-- Performing Test C_FLAG_fPIC - Success
-- Performing Test C_FLAG_D_FORTIFY_SOURCE_2
-- Performing Test C_FLAG_D_FORTIFY_SOURCE_2 - Success
-- Performing Test C_FLAG_GS
-- Performing Test C_FLAG_GS - Failed
-- Performing Test C_FLAG_sdl
-- Performing Test C_FLAG_sdl - Failed
-- Performing Test C_FLAG_fstack_protector_strong
-- Performing Test C_FLAG_fstack_protector_strong - Success
-- Performing Test C_FLAG_O2
-- Performing Test C_FLAG_O2 - Success
-- Performing Test C_FLAG_O3
-- Performing Test C_FLAG_O3 - Success
-- Performing Test C_FLAG_O0
-- Performing Test C_FLAG_O0 - Success
-- Performing Test C_FLAG_msse2
-- Performing Test C_FLAG_msse2 - Failed
-- Performing Test C_FLAG_msse4_1
-- Performing Test C_FLAG_msse4_1 - Failed
-- Performing Test C_FLAG_static_intel
-- Performing Test C_FLAG_static_intel - Failed
-- Performing Test C_FLAG_mssse3
-- Performing Test C_FLAG_mssse3 - Failed
-- Performing Test C_FLAG_mavx2
-- Performing Test C_FLAG_mavx2 - Failed
-- Performing Test C_FLAG_Qwd10148
-- Performing Test C_FLAG_Qwd10148 - Failed
-- Performing Test C_FLAG_Qwd10010
-- Performing Test C_FLAG_Qwd10010 - Failed
-- Performing Test C_FLAG_Qwd10157
-- Performing Test C_FLAG_Qwd10157 - Failed
-- Configuring done
-- Generating done
-- Build files have been written to: /build/svt-hevc/src/build
[1/137] Building ASM_NASM object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/x64Macro.asm.o
[2/137] Building ASM_NASM object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/x64inc.asm.o
[3/137] Building ASM_NASM object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/x64RegisterUtil.asm.o
[4/137] Building ASM_NASM object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPictureOperators_SSE2.asm.o
[5/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbDeblockingFilter_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbDeblockingFilter_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbDeblockingFilter_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbDeblockingFilter_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbDeblockingFilter_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbDeblockingFilter_Intrinsic_SSE2.c
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbDeblockingFilter_Intrinsic_SSE2.c:6:10: fatal error: emmintrin.h: No such file or directory
    6 | #include "emmintrin.h"
      |          ^~~~~~~~~~~~~
compilation terminated.
[6/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp16bit_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp16bit_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp16bit_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp16bit_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp16bit_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMcp16bit_Intrinsic_SSE2.c
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMcp16bit_Intrinsic_SSE2.c:6:10: fatal error: emmintrin.h: No such file or directory
    6 | #include "emmintrin.h"
      |          ^~~~~~~~~~~~~
compilation terminated.
[7/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPackUnPack_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPackUnPack_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPackUnPack_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPackUnPack_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPackUnPack_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbPackUnPack_Intrinsic_AVX2.c
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbPackUnPack_Intrinsic_AVX2.c:6:10: fatal error: immintrin.h: No such file or directory
    6 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[8/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbMCP16bit_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbMCP16bit_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbMCP16bit_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbMCP16bit_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbMCP16bit_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbMCP16bit_Intrinsic_AVX2.c
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbMCP16bit_Intrinsic_AVX2.c:6:10: fatal error: immintrin.h: No such file or directory
    6 | #include "immintrin.h"
      |          ^~~~~~~~~~~~~
compilation terminated.
[9/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPictureOperators_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPictureOperators_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPictureOperators_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPictureOperators_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbPictureOperators_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbPictureOperators_Intrinsic_AVX2.c
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbPictureOperators_Intrinsic_AVX2.c:7:10: fatal error: immintrin.h: No such file or directory
    7 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[10/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbNoiseExtractAVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbNoiseExtractAVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbNoiseExtractAVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbNoiseExtractAVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbNoiseExtractAVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbNoiseExtractAVX2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbNoiseExtractAVX2.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbNoiseExtractAVX2.h:9:10: fatal error: immintrin.h: No such file or directory
    9 | #include "immintrin.h"
      |          ^~~~~~~~~~~~~
compilation terminated.
[11/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter16bit_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter16bit_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter16bit_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter16bit_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter16bit_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbDeblockingFilter16bit_Intrinsic_SSSE3.c
/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbDeblockingFilter16bit_Intrinsic_SSSE3.c:6:10: fatal error: tmmintrin.h: No such file or directory
    6 | #include "tmmintrin.h"
      |          ^~~~~~~~~~~~~
compilation terminated.
[12/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbInvTransform_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbInvTransform_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbInvTransform_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbInvTransform_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbInvTransform_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbInvTransform_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbTransforms_SSE2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbInvTransform_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[13/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbIntraPrediction16bit_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbIntraPrediction16bit_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbIntraPrediction16bit_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbIntraPrediction16bit_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbIntraPrediction16bit_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbIntraPrediction16bit_Intrinsic_SSSE3.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbIntraPrediction16bit_Intrinsic_SSSE3.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[14/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbMcp_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbMcp_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbMcp_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbMcp_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbMcp_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbMcp_Intrinsic_SSSE3.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbMcp_SSSE3.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbMcp_Intrinsic_SSSE3.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[15/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbTransforms_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbTransforms_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbTransforms_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbTransforms_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbTransforms_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbTransforms_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbTransforms_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbTransforms_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[16/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPackUnPack_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPackUnPack_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPackUnPack_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPackUnPack_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPackUnPack_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbPackUnPack_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbPackUnPack_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbPackUnPack_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[17/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeSAD_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeSAD_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeSAD_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeSAD_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeSAD_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbComputeSAD_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbComputeSAD_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbComputeSAD_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[18/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbCombinedAveragingSAD_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbCombinedAveragingSAD_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbCombinedAveragingSAD_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbCombinedAveragingSAD_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbCombinedAveragingSAD_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbCombinedAveragingSAD_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbCombinedAveragingSAD_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[19/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbIntraPrediction_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbIntraPrediction_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbIntraPrediction_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbIntraPrediction_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbIntraPrediction_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbIntraPrediction_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbIntraPrediction_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbIntraPrediction_C.c:10:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[20/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeMean_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeMean_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeMean_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeMean_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbComputeMean_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbComputeMean_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbComputeMean_C.h:12,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbComputeMean_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[21/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbDeblockingFilter_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbDeblockingFilter_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbDeblockingFilter_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbDeblockingFilter_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbDeblockingFilter_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbDeblockingFilter_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbDeblockingFilter_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbDeblockingFilter_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[22/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbComputeMean_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbComputeMean_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbComputeMean_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbComputeMean_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbComputeMean_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbComputeMean_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbComputeMean_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[23/137] Building C object Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecProcess.c.o
FAILED: Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecProcess.c.o 
/usr/bin/cc -DSvtHevcEnc_EXPORTS -I/build/svt-hevc/src/build/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecProcess.c.o -MF Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecProcess.c.o.d -o Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecProcess.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecProcess.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbTransforms_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbTransforms.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecProcess.c:8:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[24/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbAvcStyleMcp_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbAvcStyleMcp_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbAvcStyleMcp_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbAvcStyleMcp_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbAvcStyleMcp_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbAvcStyleMcp_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbAvcStyleMcp_SSE2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbAvcStyleMcp_Intrinsic_SSE2.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[25/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbTransforms_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbTransforms_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbTransforms_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbTransforms_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbTransforms_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbTransforms_Intrinsic_SSSE3.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbTransforms_Intrinsic_SSSE3.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[26/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPackUnPack_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPackUnPack_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPackUnPack_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPackUnPack_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPackUnPack_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbPackUnPack_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbPackUnPack_SSE2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbPackUnPack_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[27/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbDeblockingFilter_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbDeblockingFilter_Intrinsic_SSSE3.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbDeblockingFilter_Intrinsic_SSSE3.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[28/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbAvcStyleMcp_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbAvcStyleMcp_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbAvcStyleMcp_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbAvcStyleMcp_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbAvcStyleMcp_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbAvcStyleMcp_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbAvcStyleMcp_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbAvcStyleMcp_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[29/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbSaoApplication_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbSaoApplication_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbSaoApplication_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbSaoApplication_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbSaoApplication_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbSaoApplication_Intrinsic_SSSE3.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbSaoApplication_Intrinsic_SSSE3.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[30/137] Building C object Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbPictureOperators_Intrinsic_SSE4_1.c.o
FAILED: Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbPictureOperators_Intrinsic_SSE4_1.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbPictureOperators_Intrinsic_SSE4_1.c.o -MF Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbPictureOperators_Intrinsic_SSE4_1.c.o.d -o Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbPictureOperators_Intrinsic_SSE4_1.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbPictureOperators_Intrinsic_SSE4_1.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbPictureOperators_SSE4_1.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbPictureOperators_Intrinsic_SSE4_1.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[31/137] Building C object Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbPictureManagerProcess.c.o
FAILED: Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbPictureManagerProcess.c.o 
/usr/bin/cc -DSvtHevcEnc_EXPORTS -I/build/svt-hevc/src/build/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbPictureManagerProcess.c.o -MF Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbPictureManagerProcess.c.o.d -o Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbPictureManagerProcess.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbPictureManagerProcess.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbPictureManagerProcess.c:9:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[32/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbGatherSaoStatistics16bit_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[33/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPictureOperators_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPictureOperators_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPictureOperators_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPictureOperators_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbPictureOperators_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbPictureOperators_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbPictureOperators_SSE2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbPictureOperators_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[34/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbTransforms_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbTransforms_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbTransforms_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbTransforms_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbTransforms_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbTransforms_Intrinsic_AVX2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbTransforms_AVX2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbTransforms_Intrinsic_AVX2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[35/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMeSadCalculation_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMeSadCalculation_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMeSadCalculation_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMeSadCalculation_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMeSadCalculation_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMeSadCalculation_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMeSadCalculation_SSE2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMeSadCalculation_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[36/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbComputeSAD_Intrinsic_AVX2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbComputeSAD_AVX2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbComputeSAD_Intrinsic_AVX2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[37/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbSampleAdaptiveOffset_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbSampleAdaptiveOffset_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbSampleAdaptiveOffset_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbSampleAdaptiveOffset_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbSampleAdaptiveOffset_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbSampleAdaptiveOffset_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbSampleAdaptiveOffset_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbSampleAdaptiveOffset_C.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[38/137] Building C object Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecTasks.c.o
FAILED: Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecTasks.c.o 
/usr/bin/cc -DSvtHevcEnc_EXPORTS -I/build/svt-hevc/src/build/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecTasks.c.o -MF Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecTasks.c.o.d -o Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecTasks.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecTasks.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecTasks.c:8:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[39/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbMcp_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMcp_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbMcp_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[40/137] Building C object Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbAvcStyleMcp_Intrinsic_SSSE3.c.o
FAILED: Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbAvcStyleMcp_Intrinsic_SSSE3.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbAvcStyleMcp_Intrinsic_SSSE3.c.o -MF Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbAvcStyleMcp_Intrinsic_SSSE3.c.o.d -o Source/Lib/ASM_SSSE3/CMakeFiles/HEVC_ASM_SSSE3.dir/EbAvcStyleMcp_Intrinsic_SSSE3.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbAvcStyleMcp_Intrinsic_SSSE3.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbAvcStyleMcp_SSSE3.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3/EbAvcStyleMcp_Intrinsic_SSSE3.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[41/137] Building C object Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbIntraPrediction16bit_Intrinsic_SSE4_1.c.o
FAILED: Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbIntraPrediction16bit_Intrinsic_SSE4_1.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbIntraPrediction16bit_Intrinsic_SSE4_1.c.o -MF Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbIntraPrediction16bit_Intrinsic_SSE4_1.c.o.d -o Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbIntraPrediction16bit_Intrinsic_SSE4_1.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbIntraPrediction16bit_Intrinsic_SSE4_1.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbIntraPrediction16bit_Intrinsic_SSE4_1.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[42/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMcp_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMcp_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMcp_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMcp_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMcp_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbMcp_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbMcp_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbMcp_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[43/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbIntraPrediction_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbIntraPrediction_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[44/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbCombinedAveragingSAD_Intrinsic_AVX2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbCombinedAveragingSAD_Intrinsic_AVX2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbCombinedAveragingSAD_Intrinsic_AVX2.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[45/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbApplySaoLcu16bit_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbApplySaoLcu16bit_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbApplySaoLcu16bit_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbApplySaoLcu16bit_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbApplySaoLcu16bit_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbApplySaoLcu16bit_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbApplySaoLcu16bit_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[46/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction16bit_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction16bit_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction16bit_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction16bit_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbIntraPrediction16bit_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbIntraPrediction16bit_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbIntraPrediction16bit_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[47/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_SadLoopKernel_AVX512.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_SadLoopKernel_AVX512.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_SadLoopKernel_AVX512.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_SadLoopKernel_AVX512.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbComputeSAD_SadLoopKernel_AVX512.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbComputeSAD_SadLoopKernel_AVX512.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbComputeSAD_SadLoopKernel_AVX512.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[48/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbTransforms_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbTransforms_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbTransforms_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbTransforms_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbTransforms_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbTransforms_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbTransforms_SSE2.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbTransforms_Intrinsic_SSE2.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[49/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMeSadCalculation_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMeSadCalculation_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMeSadCalculation_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMeSadCalculation_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbMeSadCalculation_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbMeSadCalculation_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbMeSadCalculation_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbMeSadCalculation_C.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[50/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX512.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX512.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX512.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX512.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbCombinedAveragingSAD_Intrinsic_AVX512.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbCombinedAveragingSAD_Intrinsic_AVX512.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbCombinedAveragingSAD_Intrinsic_AVX512.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[51/137] Building C object Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbIntraPrediction_Intrinsic_AVX2.c.o
FAILED: Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbIntraPrediction_Intrinsic_AVX2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbIntraPrediction_Intrinsic_AVX2.c.o -MF Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbIntraPrediction_Intrinsic_AVX2.c.o.d -o Source/Lib/ASM_AVX2/CMakeFiles/HEVC_ASM_AVX2.dir/EbIntraPrediction_Intrinsic_AVX2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbIntraPrediction_Intrinsic_AVX2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2/EbIntraPrediction_Intrinsic_AVX2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[52/137] Building C object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbSaoStatistics_Intrinsic_SSE2.c.o
FAILED: Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbSaoStatistics_Intrinsic_SSE2.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbSaoStatistics_Intrinsic_SSE2.c.o -MF Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbSaoStatistics_Intrinsic_SSE2.c.o.d -o Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbSaoStatistics_Intrinsic_SSE2.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbSaoStatistics_Intrinsic_SSE2.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2/EbSaoStatistics_Intrinsic_SSE2.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[53/137] Building C object Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPictureOperators_C.c.o
FAILED: Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPictureOperators_C.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPictureOperators_C.c.o -MF Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPictureOperators_C.c.o.d -o Source/Lib/C_DEFAULT/CMakeFiles/HEVC_C_DEFAULT.dir/EbPictureOperators_C.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbPictureOperators_C.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbPictureOperators_C.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT/EbPictureOperators_C.c:39:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[54/137] Building C object Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbTransforms_Intrinsic_SSE4_1.c.o
FAILED: Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbTransforms_Intrinsic_SSE4_1.c.o 
/usr/bin/cc  -I/build/svt-hevc/src/build/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbTransforms_Intrinsic_SSE4_1.c.o -MF Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbTransforms_Intrinsic_SSE4_1.c.o.d -o Source/Lib/ASM_SSE4_1/CMakeFiles/HEVC_ASM_SSE4_1.dir/EbTransforms_Intrinsic_SSE4_1.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbTransforms_Intrinsic_SSE4_1.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1/EbTransforms_Intrinsic_SSE4_1.c:6:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[55/137] Building C object Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecResults.c.o
FAILED: Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecResults.c.o 
/usr/bin/cc -DSvtHevcEnc_EXPORTS -I/build/svt-hevc/src/build/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecResults.c.o -MF Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecResults.c.o.d -o Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecResults.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecResults.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecResults.c:7:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[56/137] Building C object Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecSegments.c.o
FAILED: Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecSegments.c.o 
/usr/bin/cc -DSvtHevcEnc_EXPORTS -I/build/svt-hevc/src/build/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecSegments.c.o -MF Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecSegments.c.o.d -o Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncDecSegments.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecSegments.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecSegments.h:9,
                 from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncDecSegments.c:9:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[57/137] Building ASM_NASM object Source/Lib/ASM_SSE2/CMakeFiles/HEVC_ASM_SSE2.dir/EbGatherSaoStatistics16bit_SSE2.asm.o
[58/137] Building C object Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncHandle.c.o
FAILED: Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncHandle.c.o 
/usr/bin/cc -DSvtHevcEnc_EXPORTS -I/build/svt-hevc/src/build/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec -I/build/svt-hevc/src/SVT-HEVC/Source/API -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/C_DEFAULT -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE2 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSSE3 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_SSE4_1 -I/build/svt-hevc/src/SVT-HEVC/Source/Lib/ASM_AVX2 -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncHandle.c.o -MF Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncHandle.c.o.d -o Source/Lib/Codec/CMakeFiles/SvtHevcEnc.dir/EbEncHandle.c.o -c /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncHandle.c
In file included from /build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbEncHandle.c:18:
/build/svt-hevc/src/SVT-HEVC/Source/Lib/Codec/EbDefinitions.h:228:10: fatal error: immintrin.h: No such file or directory
  228 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
ninja: build stopped: subcommand failed.
```
