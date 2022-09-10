# distrobuilder

## Apendix

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

