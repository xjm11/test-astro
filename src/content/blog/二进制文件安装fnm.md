---
title: 使用发布二进制的形式安装 fnm
pubDate: "2023-05-29 10:55:37"
description: ""
heroImage: "/placeholder-hero.jpg"
---

# 使用发布二进制的形式安装 fnm

使用发布版本的二进制形式装 fnm

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/201ad2db-8334-43eb-a113-879ac27089be/Untitled.jpeg)

```
Using a release binary (Linux/macOS/Windows)
Download the latest release binary for your system
Make it available globally on PATH environment variable
Set up your shell for fnm
```

1. 下载二进制文件 ，如下所示：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3df91b81-cc09-4ad4-880a-08ac5373e70f/Untitled.png)

2.  执行文件

```jsx
chmod +x fnm  // 添加可执行权限， 不执行的话，文件执行不了，会提示命令找不到

ls -a
ls -l | grep fnm

文件权限信息举例
-rwxrwxr-x@  1 xxxx staff    6100712 12  5 21:48 fnm

sudo ./fnm    // 执行可执行文件， 最好放到/usr/local/bin 下 或者/usr/bin 目录下
```

1. 添加 PATH 环境变量使其全局访问

### 可以使用以下命令来查找程序的执行路径：

1. which 命令：它会在系统的 PATH 路径中查找程序，并返回程序的完整路径。

例如，要查找 fnm 程序的路径，可以运行以下命令：

```
which fnm

```

1. whereis 命令：它会在标准的程序目录中查找程序，并返回程序的路径和帮助文件路径。

例如，要查找 fnm 程序的路径，可以运行以下命令：

```
whereis fnm

```

1. locate 命令：它会在系统的文件索引中查找文件，并返回匹配的文件路径。

例如，要查找 fnm 程序的路径，可以运行以下命令：

```
locate fnm

```

请注意，locate 命令需要先更新文件索引数据库，可以使用以下命令更新：

```
sudo updatedb
```

### 添加 PATH 环境变量

1. 输入以下命令来查看当前的 PATH 环境变量：

   ```
   echo %PATH%    (Windows)
   echo $PATH     (Linux/macOS)

   ```

2. 将要添加的路径复制到剪贴板中。
3. 输入以下命令来将路径添加到 PATH 环境变量中：

   ```
   set PATH=%PATH%;[要添加的路径]    (Windows)
   export PATH=$PATH:[要添加的路径]  (Linux/macOS)

   ```

   例如，要将 fnm 路径添加到 PATH 环境变量中，可以使用以下命令：

   ```
   set PATH=%PATH%;C:\Users\用户名\.fnm    (Windows)
   export PATH=$PATH:/home/用户名/.fnm     (Linux/macOS)

   ```

4. 输入以下命令来验证路径是否已成功添加到 PATH 环境变量中：

   ```
   echo %PATH%    (Windows)
   echo $PATH     (Linux/macOS)

   ```

   如果已成功添加，应该可以看到新添加的路径。

不过上面的操作是在当前会话中临时添加环境变量，而 zsh 添加 path 是将环境变量永久添加到系统中。

### 在 zsh 中添加 PATH

1. 打开终端程序，输入以下命令：

```
echo $PATH

```

这会显示当前系统的 PATH 环境变量值，以冒号分隔的一系列目录路径。其中包括系统默认路径和用户自定义路径。

1. 编辑 zshrc 文件，该文件是 zsh 的配置文件。在终端输入以下命令：

```
nano ~/.zshrc

```

这将打开 nano 编辑器，并加载.zshrc 文件。

1. 在.zshrc 文件中添加自定义路径。在文件末尾添加以下代码：

```
export PATH=$PATH:/path/to/directory

```

其中，/path/to/directory 是你要添加的自定义路径。

1. 保存并退出 nano 编辑器。按 Ctrl + X，然后按 Y，最后按 Enter 键。
2. 重新加载.zshrc 文件，以使更改生效。在终端输入以下命令：

```
source ~/.zshrc

```

这将重新加载.zshrc 文件，使添加的自定义路径生效。

1. 验证更改是否生效。再次输入以下命令：

```
echo $PATH

```

如果自定义路径已添加到 PATH 环境变量中，则应该可以看到该路径。

### 为 fnm 配置 shell

### 例如：Zsh

Add the following to your `.zshrc` profile:

```json
eval "$(fnm env --use-on-cd)"
```

这句话的具体意思是：在当前 shell 中执行 fnm env --use-on-cd 命令，并将输出结果作为命令进行执行，以便在每次切换目录时自动切换到正确的 Node.js 版本。

当您切换到另一个目录时，fnm 将自动检查该目录中的.fnvmrc 文件，并根据其中指定的 Node.js 版本自动切换到正确的版本。这使得在多个 Node.js 项目之间切换变得更加容易和无缝。

具体命令解析：

- `fnm`  工具中的  `env`  子命令显示当前目录下的  `fnmfile`  文件中的变量。`fnm file`  命令用于生成一个包含应用程序所需依赖项的清单文件。
- `-use-on-cd`  是一个用于控制如何执行  `fnmfile`  的选项，具体而言它指示  `fnm`  工具在切换到该目录时自动运行  `fnm install`  命令来安装  `fnmfile`  中列出的依赖项。
- `eval`  命令用于将一个字符串解析为 shell 命令并执行它们。

## 额外解释概念：

1. 终端：终端是指计算机系统中与用户直接交互的设备，例如显示器、键盘、鼠标等。终端是用户与计算机系统之间的接口，用户通过终端向计算机系统输入指令、数据或者获取计算机系统的输出结果。终端可以是物理设备，也可以是软件程序，例如远程终端软件。
2. zsh：zsh 是一种 shell，它可以在终端中使用。它一种命令行解释器。它是一种替代 bash 的 shell，提供了更多的功能和定制选项。
3. bash：mac 环境默认的 shell
4. shell：是一种命令行解释器，是用户与操作系统内核之间的交互界面。
5. 二进制形式的程序：指程序的可执行文件，常见的扩展名为.app 或者.command。这种形式的程序直接运行即可，无需安装。

### 二进制形式程序区分于 dmg 格式

二进制形式是指程序的可执行文件，常见的扩展名为.app 或者.command。这种形式的程序直接运行即可，无需安装。

而 dmg 格式是一种虚拟磁盘镜像文件，常用于 Mac 系统中的软件安装包。用户需要将 dmg 文件挂载为磁盘，然后将其中的应用程序复制到指定目录才能使用。这种形式的程序通常需要进行安装，可以安装到系统中或者独立安装到某个目录中。

选择使用二进制形式还是 dmg 格式，一般取决于开发者的需求和用户的使用习惯。对于一些小型的工具类应用，使用二进制形式更加便捷；而对于一些大型的应用，使用 dmg 格式可以更好地管理和安装。

### mac 下二进制形式的可执行文件一般放哪里合适

在 macOS 上，二进制可执行文件通常放在 /usr/local/bin/ 目录下。这个目录是系统预留给用户自己安装软件的目录，也是系统默认的 PATH 环境变量中包含的目录之一，因此将可执行文件放在该目录下可以方便地在终端中直接调用。如果需要在系统范围内安装可执行文件，也可以将其放在 /usr/bin/ 目录下，但这需要管理员权限。

### 文件的权利管理

文件的权限管理是指对文件进行访问控制的一种机制，用于保护文件的隐私和安全。在 Linux 系统中，文件的权限管理包括读（r）、写（w）和执行（x）三种权限。

例如，假设有一个名为 example.txt 的文件，它的权限为 rw-r--r--，表示：

- 所有者（owner）具有读写权限（rw-）；
- 同组用户（group user）具有读权限（r--）；
- 其他用户（other user）具有读权限（r--）。

这意味着，所有者可以读取、修改和执行该文件，而同组用户和其他用户只能读取该文件，但不能修改或执行该文件。

以下是一些常见的文件权限管理操作：

1. 设置文件权限：使用 chmod 命令可以设置文件的读、写和执行权限。例如，要将 example.txt 文件的权限设置为 rw-rw-rw-，可以使用以下命令：

```

chmod 666 example.txt
chmod +x test.txt
```

这将给予所有用户对该文件的读写权限。

2. 更改文件所有者：使用 chown 命令可以更改文件的所有者。例如，要将 example.txt 的所有者更改为 user1，可以使用以下命令：

```
bash复制代码
chown user1 example.txt
```

这将把 example.txt 的所有者更改为 user1。

3. 更改文件组：使用 chgrp 命令可以更改文件的组。例如，要将 example.txt 的组更改为 group1，可以使用以下命令：

```
bash复制代码
chgrp group1 example.txt
```

这将把 example.txt 的组更改为 group1。

4. 检查文件权限：使用 ls 命令可以检查文件的权限。例如，要检查 example.txt 的权限，可以使用以下命令：

```
bash复制代码
ls -l example.txt
```

这将显示文件的权限信息。

参考

https://github.com/Schniz/fnm
