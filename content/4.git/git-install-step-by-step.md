---
title: Git 逐步安装指南
description: Git Installer 逐步解析
aside: false
navigation: false
---

# GIt 逐步安装指南

::alert{type="info"}
以 *Windows* 下的 *User Installer* 为例 :br
:br
本文撰写之日最新的 *Git* 版本为 :badge[2.39.2]{type="warning"}
::


## 用户协议

![](/img/4/99/1.png)

点击 `Next` 即可进入下一步。


## 选择组件

![](/img/4/99/2.png)

| 选项                                                             |                                                  | 建议与否 |
| ---------------------------------------------------------------- | ------------------------------------------------ | -------- |
| Additional icons                                                 | 在资源管理器中显示的图标                         | -        |
| On the Desktop                                                   | 在桌面上创建快捷方式                             | -        |
| Windows Explorer integration                                     | 在资源管理器集成                                 | -        |
| Git Bash Here                                                    | 在资源管理器中右键菜单添加 “在此处打开 Git Bash” | -        |
| Git GUI Here                                                     | 在资源管理器中右键菜单添加 “在此处打开 Git GUI”  | -        |
| Git LFS (Large File Support)                                     | Git Large File Storage                           | 是       |
| Associate .git* configuration files with the default text editor | 与默认文本编辑器关联 .git* 配置文件              | 是       |
| Associate .sh files to be run with Bash                          | 与 *Bash* 关联 .sh 文件                          | 否       |
| Check daily for Git for Windows updates                          | 每天检查 *Git for Windows* 更新                  | -        |
| (NEW!) Add a Git Bash Profile to Windows Terminal                | 在 Windows Terminal 中添加 *Git Bash* 配置文件   | -        |
| (NEW!) Scalar (Git add-on to manage large-scale repositories)    | 启用 Scalar （用于管理大规模库的 *Git* 插件）    | 是       |

## 注册默认编辑器

![](/img/4/99/3.png)

::alert{type="info"}
如按照本指南安装 *VSCode*，则此处应选择 `Use Visual Studio Code as Git's default editor`
::

::alert{type="warning"}
*Git* 同时支持将 *VSCode* 与 *VSCode Insiders* （*VSCode* 预览版）作为默认编辑器，请注意区分。
::


## 调整初始化新库时的初始分支名

![](/img/4/99/4.png)

::alert{type="info"}
*GitHub* 默认的初始分支名为 `main`，而 *Git* 默认的初始分支名为 `master`。
建议如图操作
::


## 调整系统环境变量

![](/img/4/99/5.png)

控制 *Git* 在系统环境变量中的配置。

如不清楚此项的作用，请选择 `Git from the command line and also from 3rd-party software`。


## 选择SSH可执行文件

![](/img/4/99/6.png)

::alert{type="info"}
*Windows* 自带了 *OpenSSH* 客户端，同时 *Git* 也自带了 *OpenSSH* 客户端。 :br
选择 `Use external OpenSSH` 即可调用 *Windows* 自带的 *OpenSSH* 客户端。
::


## 选择 HTTPS 传输后端

![](/img/4/99/7.png)

默认即可。


## 配置换行符转换

![](/img/4/99/8.png)

::callout
#summary
*DOS* 系统与 *UNIX* 系统使用的换行符不同。

#content
https://www.cs.toronto.edu/~krueger/csc209h/winter/lectures/lec-02.html

DOS vs. Unix Line Endings
Text files created on DOS/Windows machines have different line endings than files created on Unix/Linux. DOS uses carriage return and line feed ("\r\n") as a line ending, which Unix uses just line feed ("\n"). You need to be careful about transferring files between Windows machines and Unix machines to make sure the line endings are translated properly.

The CDF staff have written a thorough explanation of converting between Unix and DOS files

In the directory /u/csc207h/winter/pub/bin, you will find a little Perl program called dos2unix that will conver DOS line endings to Unix line endings. You can set your path to include this directory so that you can run the program, or you can copy it to your own bin directory. Run the program as dos2unix <filenmae>. The file <filename> is modified.

IMPORTANT: You must submit files in the CVS directory with Unix/Linux file endings. If you only use CVS to transfer files between your home machine and CDF, you should not have to worry about line endings. However, you must test your programs on CDF before you submit them. Shell programs, in particular, will fail in mysterious ways if they contain DOS line endings.
::

保持默认即可。


## 配置 *Git Bash* 的终端模拟器

![](/img/4/99/9.png)

默认即可。


## 选择 `git pull` 命令的默认行为

![](/img/4/99/10.png)

默认即可，`git pull` 指令将在 [*Git* 参照](2.git-reference.md) 中详细讲解。


## 选择凭证管理器

![](/img/4/99/11.png)

默认即可。


## 配置额外选项

![](/img/4/99/12.png)

默认即可。


## 配置实验性选项

![](/img/4/99/13.png)

::alert{type="warning"}
这些项目可能会频繁变更，生成环境不建议使用。
::

然后点击 `Install` 即可开始安装。

## 完成安装

![](/img/4/99/14.png)

取消勾选然后点击 `Finish` 即可完成安装。
