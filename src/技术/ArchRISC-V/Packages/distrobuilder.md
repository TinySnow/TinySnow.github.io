# distrobuilder

## 错误排查

### 原始报错信息

```console
# github.com/lxc/lxd/shared
In file included from vendor/github.com/lxc/lxd/shared/util_linux_cgo.go:37:
./../lxd/include/syscall_wrappers.h:30:19: error: static declaration of 'open_tree' follows non-static declaration
   30 | static inline int open_tree(int dfd, const char *filename, unsigned int flags)
      |                   ^~~~~~~~~
In file included from ./../lxd/include/macro.h:33,
                 from ./../lxd/include/memory_utils.h:11,
                 from ./../lxd/include/process_utils.h:18,
                 from vendor/github.com/lxc/lxd/shared/util_linux_cgo.go:36:
/usr/include/sys/mount.h:253:12: note: previous declaration of 'open_tree' with type 'int(int,  const char *, unsigned int)'
  253 | extern int open_tree (int __dfd, const char *__filename, unsigned int __flags)
      |            ^~~~~~~~~
./../lxd/include/syscall_wrappers.h:45:19: error: conflicting types for 'mount_setattr'; have 'int(int,  const char *, unsigned int,  struct lxc_mount_attr *, size_t)' {aka 'int(int,  const char *, unsigned int,  struct lxc_mount_attr *, long unsigned int)'}
   45 | static inline int mount_setattr(int dfd, const char *path, unsigned int flags,
      |                   ^~~~~~~~~~~~~
/usr/include/sys/mount.h:261:12: note: previous declaration of 'mount_setattr' with type 'int(int,  const char *, unsigned int,  struct mount_attr *, size_t)' {aka 'int(int,  const char *, unsigned int,  struct mount_attr *, long unsigned int)'}
  261 | extern int mount_setattr (int __dfd, const char *__path, unsigned int __flags,
      |            ^~~~~~~~~~~~~
./../lxd/include/syscall_wrappers.h:51:19: error: static declaration of 'move_mount' follows non-static declaration
   51 | static inline int move_mount(int from_dfd, const char *from_pathname, int to_dfd,
      |                   ^~~~~~~~~~
/usr/include/sys/mount.h:239:12: note: previous declaration of 'move_mount' with type 'int(int,  const char *, int,  const char *, unsigned int)'
  239 | extern int move_mount (int __from_dfd, const char *__from_pathname,
      |            ^~~~~~~~~~
github.com/mudler/docker-companion/api
==> ERROR: A failure occurred in build().
    Aborting...
==> ERROR: Build failed, check /var/lib/archbuild/extra-riscv64/felix3/build
```

### 定位错误

`error: static declaration of 'open_tree' follows non-static declaration`.

### 过程

1. 从 `distrobuilder` 上游 repo 寻找解决方案无果。
2. Google 相关报错信息，部分 Forum 说是 `qemu-user` 的问题，遂在板子上跑一遍，出现同样问题，排除。
3. 因第一级上游找不到解决方案，于是回查 error log，定位错误模块 `lxd`（原始报错信息第一行）。
4. 第二级上游 `lxd` repo 的 issue 和 pr 中有相关错误的解决方案，但是日期有新有旧，而且每个 pr 更改的文件太多，完全不符合 `distrobuilder` 里文件的目录结构，pr 有很多后者没有的文件。
5. 尝试采取最新的 pr，拉取 patch，然后 remove 所有缺失文件的修改。
6. 编译构建，成功。

### 总结

这个包排查挺辛苦，遇到很多问题，幸好最后都解决了，也去尝试了。

## Appendix

### Pull Request Description(Original Version)

```markdown
Tough work. Build passed.

### TL;DR

1. Trace the module which is really crashed: `lxd`.
2. Download the PR, and make it to patch.
3. Modify the patch by myself.
4. Find the strange but truely correct path in this repo, then patch it.
5. This PR.

<details>

<summary>### Fix Processing</summary>

1. I tried to find some meaningful help in this repo's upstream according to the log. But I found nothing.

    However, I found someone in `google` saying that `qemu-user` possibly led this fault.

    Then I tried on `RISC-V` board, it occurred the same error as running in `qemu-user`.

2. I tracing the original place of error occurring, it has a comment in one line that points at repo's URL link. The repo is `lxd`, a dependency that `distrobuilder` relies on.

    Follow the link, then search the error message, finally, I find one pull request. I have no idea about whether it is truly helpful because the `Files changed` has too much.

    The problem is the `lxd` that `distrobuilder` truly relies on has only little files, futhermore, it is put at `vendor/github.com/lxd`. I reasonably doubt that the `distrobuilder` uses a minimal, mirrored release (Maybe it's a release, god knows) of `lxd`.

3. I make the `Files changed` of `lxd` to a patch, then delete the exceeded and needless change, further, patch to the strange path.

4. It works.

5. But I really don't know whether my modification of this package is justified or not, and also don't know if there is some files in this repo that should be altered but haven't.

    If my modification is a confusing management, please tell me how I can fix it in a correct way.

</details>

### Notice

The patch file is altered by TinySnow.
Patch from origin upstream doesn't work.

<details>
<summary>### Perhaps Useful Links</summary>
- `lxd` issue: https://github.com/lxc/lxd/issues/10738

- `lxd` PR: https://github.com/lxc/lxd/pull/10756
</details>
```

### Pull Request Description(Modified Version)

```markdown
Tough work. Build passed.

1. The `fix-static-declaration-of-lxd` patch is from the upstream of `lxd`, which is really crashed in `distrobuilder` building proeessing.
2. Delete the exceeded and needless change in upstream's patch.
  _i.e._ `lxd/main_checkfeature.go`(In `distrobuilder`, this file doesn't exist.)
3. Patch and this PR.

### Notice

The patch file is altered by TinySnow.
Patch from origin upstream doesn't work.

### Perhaps Useful Links

- `lxd` issue: https://github.com/lxc/lxd/issues/10738
- `lxd` PR: https://github.com/lxc/lxd/pull/10756
```

