---
title: 速通协作
navigation: false
---

# GitHub 团队协作速通

## 项目同步

### GitHub 远程仓库

每个模块开独立的 `repository`，在 GitHub 网页右上角 `+` > `New repository` 创建，创建时记得切换 Owner。


### 本地同步

对于不熟悉 `Git` 的同学可以使用 `GitHub Desktop`，[下载地址](https://desktop.github.com/)。

[快速入门指南](./github/github-desktop)，如果已在网页初始化仓库，可直接从 [#克隆仓库](./github/github-desktop#克隆仓库) 开始。也可直接使用 GitHub Desktop 创建仓库，参见 [#创建新仓库](./github/github-desktop#创建新仓库)。

::alert{type="info"}
这个带章节的跳转跳不到章节，自己在右侧toc点一下吧
::

::alert{type="danger"}
**在未确定导致 push 失败的原因前请勿 force push**
::


## 项目规范

### Git 分支

所有更改都新建 分支（branch）进行，在确认无误并没有冲突后合并到 `main` 分支。


### 变量命名

变量命名使用 `snake_case`，即小写字母和下划线组合，如 `my_variable`。


## 工具推荐

让我看看是谁还没装 conda

Miniconda 基本能满足需求，[下载地址](https://docs.conda.io/en/latest/miniconda.html#latest-miniconda-installer-links)。安装完后记得把 `[PATH_TO_CONDA]/condabin` 加入PATH。

::alert{type="info"}
`[PATH_TO_CONDA]` 为 conda 安装路径，如 `C:\Users\username\miniconda3`。
::

Win：`Win + S` 输入 `env` 回车，点击 `环境变量`，在 `系统变量` 中找到 `Path`，点击 `编辑`，点击 `新建`，输入 `[PATH_TO_CONDA]\condabin`，点击 `确定`。

完成后打开一个新的终端，输入 `conda init`，然后重启终端以初始化 conda。


### IDE

VSCode适用于轻量的查看与编辑，[入门指南](./vscode/download-and-install)

正经开发，[PyCharm](https://www.jetbrains.com/pycharm/) 请