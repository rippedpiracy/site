# Ripped.guide

Replacement for the #trusted-sites channel in the [Ripped Discord](https://discord.ripped.guide).

If you **do** suggest something, please keep note that it:
- needs to be a trusted and safe resource.
- cannot host other illegal content like data breaches.
- cannot be a single download link.
- has to be hosted on the clearnet.

# How do i contribute?

Easily head over to the [**docs**](https://github.com/rippedpiracy/docs) repo and make an issue or a Pull Request.

# Local Development

Clone the repository:

```
git clone --recurse-submodules https://github.com/rippedpiracy/
```

If you have already cloned without submodules, fetch them:

```
git submodule update --init --remote --recursive
```

We used to have a GitHub action that updated the `docs` submodule, but took it out due to history clutter. Ensure your local copy is up to date with the latest `docs` commit:

```
git submodule update --remote
```

