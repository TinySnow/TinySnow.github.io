# SVT-VP9

## 错误排查

1. 找到错误源

   几乎所有错误都是在报 `fatal error: immintrin.h: No such file or directory`。

2. 上网查资料

   发现有很多软件都报这个错误，然后有人说此头文件是 `x86_64 only` 的，遂上报 issue，然后等待上游回应。

3. 后来组里有人说，与 `HEVC` 不同，`VP9` 在兼容模式下可能运行成功，提出了一种[解决方案](https://github.com/felixonmars/archriscv-packages/pull/1578#issuecomment-1210684784)，但是暂时还没有尝试。尝试后更新记录。

## Issue 上报

Hello, I'm from ArchRISC-V Team, a community porting Arch Linux software to RISC-V architecture.

### Description

When post `SVT-VP9`, we encountered compile error. Looking up the log, we find `immintrin.h` head file, which leaded this fail.

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
CMake Deprecation Warning at CMakeLists.txt:6 (cmake_minimum_required):
  Compatibility with CMake < 2.8.12 will be removed from a future version of
  CMake.

  Update the VERSION argument <min> value or use a ...<max> suffix to tell
  CMake that the project does not need compatibility with older versions.


-- The C compiler identification is GNU 12.1.1
-- The ASM_NASM compiler identification is NASM
-- Found assembler: /usr/bin/nasm
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
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
-- Performing Test C_FLAG_fvisibility_hidden
-- Performing Test C_FLAG_fvisibility_hidden - Success
-- Performing Test C_FLAG_GS
-- Performing Test C_FLAG_GS - Failed
-- Performing Test C_FLAG_sdl
-- Performing Test C_FLAG_sdl - Failed
-- Performing Test C_FLAG_fstack_protector_strong
-- Performing Test C_FLAG_fstack_protector_strong - Success
-- Performing Test C_FLAG_msse2
-- Performing Test C_FLAG_msse2 - Failed
-- Performing Test C_FLAG_mssse3
-- Performing Test C_FLAG_mssse3 - Failed
-- Performing Test C_FLAG_msse4_1
-- Performing Test C_FLAG_msse4_1 - Failed
-- Performing Test C_FLAG_mavx2
-- Performing Test C_FLAG_mavx2 - Failed
-- Configuring done
-- Generating done
-- Build files have been written to: /build/svt-vp9/src/build
ninja: Entering directory `build'
[1/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_context_tree.c.o
[2/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_common_data.c.o
[3/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_filter.c.o
[4/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/fwd_txfm.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/fwd_txfm.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/fwd_txfm.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/fwd_txfm.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/fwd_txfm.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/fwd_txfm.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/fwd_txfm.c:12:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[5/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/quantize.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/quantize.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/quantize.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/quantize.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/quantize.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/quantize.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/quantize.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[6/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/intrapred.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/intrapred.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/intrapred.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/intrapred.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/intrapred.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/intrapred.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/intrapred.c:16:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[7/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_dct.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_dct.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_dct.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_dct.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_dct.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_dct.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_rtcd.h:19,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_dct.c:12:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[8/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_quantize.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_quantize.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_quantize.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_quantize.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_quantize.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_quantize.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_quantize.c:12:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[9/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_loopfilter.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_loopfilter.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_loopfilter.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_loopfilter.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_loopfilter.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[10/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/loopfilter.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/loopfilter.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/loopfilter.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/loopfilter.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/loopfilter.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/loopfilter.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/loopfilter.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[11/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/subtract.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/subtract.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/subtract.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/subtract.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/subtract.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/subtract.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/subtract.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[12/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/inv_txfm.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/inv_txfm.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/inv_txfm.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/inv_txfm.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/inv_txfm.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/inv_txfm.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/inv_txfm.c:12:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[13/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropy.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropy.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropy.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropy.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropy.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_entropy.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_entropy.c:16:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[14/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_pred_common.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_pred_common.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_pred_common.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_pred_common.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_pred_common.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_pred_common.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_pred_common.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_pred_common.c:15:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[15/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_blockd.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_blockd.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_blockd.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_blockd.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_blockd.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.c:14:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[16/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/psnr.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/psnr.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/psnr.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/psnr.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/psnr.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/psnr.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/psnr.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[17/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rdopt.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rdopt.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rdopt.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rdopt.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rdopt.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_rdopt.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_block.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_rdopt.c:18:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[18/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymv.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymv.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymv.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymv.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymv.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_entropymv.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_onyxc_int.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_entropymv.c:14:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[19/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_bitstream.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_bitstream.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_bitstream.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_bitstream.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_bitstream.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_bitstream.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_tokenize.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_bitstream.c:21:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[20/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_alloccommon.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_alloccommon.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_alloccommon.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_alloccommon.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_alloccommon.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_alloccommon.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_onyxc_int.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_alloccommon.c:16:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[21/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_ratectrl.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_ratectrl.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_ratectrl.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_ratectrl.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_ratectrl.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_ratectrl.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_onyxc_int.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_ratectrl.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[22/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymode.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymode.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymode.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymode.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_entropymode.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_entropymode.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_entropymode.c:19:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[23/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_idct.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_idct.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_idct.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_idct.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_idct.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_idct.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_rtcd.h:19,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_idct.c:12:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[24/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_mvref_common.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_mvref_common.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_mvref_common.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_mvref_common.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_mvref_common.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_mvref_common.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_onyxc_int.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_mvref_common.h:13,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_mvref_common.c:12:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[25/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconinter.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconinter.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconinter.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconinter.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconinter.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_reconinter.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_reconinter.c:13:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[26/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rd.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rd.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rd.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rd.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_rd.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_rd.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbUtility.h:9,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_rd.c:23:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[27/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/prob.c.o
[28/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_picklpf.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_picklpf.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_picklpf.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_picklpf.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_picklpf.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_picklpf.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_picklpf.c:15:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[29/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/bitwriter.c.o
[30/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_cost.c.o
[31/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_quant_common.c.o
[32/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/bitwriter_buffer.c.o
[33/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encodemv.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encodemv.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encodemv.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encodemv.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encodemv.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encodemv.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_onyxc_int.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encoder.h:18,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encodemv.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encodemv.c:20:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[34/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encoder.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encoder.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encoder.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encoder.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_encoder.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encoder.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_loopfilter.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_onyxc_int.h:23,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encoder.h:18,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_encoder.c:50:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[35/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scale.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scale.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scale.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scale.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scale.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_scale.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vpx_dsp_rtcd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_scale.c:11:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[36/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconintra.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconintra.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconintra.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconintra.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_reconintra.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_reconintra.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_reconintra.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_reconintra.c:14:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
[37/158] Building C object Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scan.c.o
FAILED: Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scan.c.o 
/usr/bin/cc  -I/build/svt-vp9/src/build/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/Lib/VPX -I/build/svt-vp9/src/SVT-VP9/Source/API -I/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_AVX2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE2 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSE4_1 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/ASM_SSSE3 -I/build/svt-vp9/src/SVT-VP9/Source/Lib/C_DEFAULT -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions         -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security         -fstack-clash-protection -flto=auto -Wall -Wextra -Wformat -Wformat-security -fPIE -fPIC -D_FORTIFY_SOURCE=2 -fvisibility=hidden -fstack-protector-strong -fPIC -std=gnu99 -MD -MT Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scan.c.o -MF Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scan.c.o.d -o Source/Lib/VPX/CMakeFiles/libVPX.dir/vp9_scan.c.o -c /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_scan.c
In file included from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_blockd.h:32,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_scan.h:17,
                 from /build/svt-vp9/src/SVT-VP9/Source/Lib/VPX/vp9_scan.c:11:
/build/svt-vp9/src/SVT-VP9/Source/Lib/Codec/EbDefinitions.h:402:10: fatal error: immintrin.h: No such file or directory
  402 | #include <immintrin.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
ninja: build stopped: subcommand failed.
```
