# npm包版本管理

## 前言

先提一个场景，我们经常有时候clone了一个远古项目，然后在本地`npm install`之后，就报了很多奇奇怪怪的问题导致项目跑不起来，有时候我们把`node_modules`删掉，用`yarn`安装，又莫名奇妙的好了，另外有时候叫可以跑的同事复制一份`package-lock.json`或者`yarn.lock`文件，再重新安装就好了。后面章节就力求让这个莫名其妙的过程透明化且可以分析。

## semver版本依赖

`npm`采用的是[semver](https://semver.org/)版本管理方式。简单来说，日常我们看到的版本号形如X.Y.Z，你必须说明每次升级变更会对第三方使用产生哪些影响。这就是语义化版本想要传达的。一个版本有三部分：X, Y, Z，分别指代大版本，小版本，与bugfix版本。比如1.2.3，那么就是大版本1，小版本2，bugfix版本3。bugfix版本不会影响任何功能，小版本变更往往是增加新功能，也不会影响使用。而大版本变更往往会带来使用层面不兼容的情况，需要再做调整。

另外，还有几种符号，代表版本的范围匹配：

+ `^1.2.2`：代表安装不低于`1.2.2`的版本，但是大版本号需相同，即`1.2.2`即其以上的`1.x.x`版本都是可以的。

+ `~1.2.2`：代表安装不低于`1.2.2`的版本，但是大版本号和小版本号需相同，即`1.2.2`即其以上的`1.2.x`版本都是可以的。

+ `1.2.2`：`1.2.2`版本号全匹配。

+ `先行版本`：当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，你可能要先发布一个先行版本。先行版本号可以加到**主版本号.次版本号.修订号**的后面，先加上一个连接号再加上一连串以句点分隔的标识符和版本编译信息。

  + 内部版本(`alpha`)
  + 公测版本(`beta`)
  + 正式版本的候选版本`rc`：即 `Release candiate`

## npm包依赖管理

有了semver版本之后，大家如果都根据这样的规范来做事，那一般都不会出什么大问题。`npm install`的输入是`package.json`，它的输出是一棵`node_modules`树。理想情况下，`npm install`应该像纯函数一样工作，对于同一个`package.json`总是生成完全相同的`node_modules`树。在某些情况下，就算是有一些小版本例如`~`或者`^`符号带来的版本微调，但是因为大版本不变，所以从语义上来说我们的核心功能也不会受到影响。

但是规范这种东西，没有强求就一定会走偏。事实上，很多npm包的开发者并不一定会依照这样的版本管理来发布自己的代码。

试想一下，之前你们的同事安装了某个包版本我们叫`bowlofnoodles`是`^1.2.2`(实际上经常出现这样的版本号，因为`npm install xx`不指定版本的情况下默认就是这样的，从语义上来说小版本和bugfix版本都不会影响使用，都是增强功能。)。此时一年后，`bowlofnoodles`已经升级到了`1.8.5`。根据semver版本，此时你就会安装到`1.8.5`，但是开发者在这个版本中把以前`1.2.2`的一些接口删了，此时就报了bug导致项目启动不了。

聪明的人会想，那我把版本写死`1.2.2`，不就能安装到同样的版本了。但是`node_modules`本质是个树形，你可以锁定`bowlofnoodles`的版本，但是如果同样的情况出现在`bowlofnoodles`这个包的版本管理中，那怎么办呢? 

## package-lock.json的出现

如果我们能够通过什么方式安装得到跟同事相同的`node_modules`树那肯定就能够解决上述的版本不稳定问题。所以`package-lock.json`出现了。在`npm install`的时候，会生成一个`package-lock.json`，可以理解为描述`node_modules`树的快照，里面包含着你安装到包的版本记录。那我们下次再根据这个`package-lock.json`去装包，就可以解决上面的问题了。

那么，`package.json`和`package-lock.json`同时存在的时候且他们的版本存在冲突时，哪个优先级更高或者根据什么样的规则来安装呢?

不同npm包版本，关于这个问题其实表现的会有一些不一样：

+ `5.0.x`版本：不管`package.json`中依赖是否有更新，`npm install`都会根据`package-lock.json`下载。针对这种安装策略，有人提出了这个[issue-#16866](https://github.com/npm/npm/issues/16866) ，然后就演变成了5.1.0版本后的规则。
 
+ `5.1.0`版本后：当`package.json`中的依赖项有新版本时，`npm install`会无视`package-lock.json`去下载新版本的依赖项并且更新`package-lock.json`。针对这种安装策略，又有人提出了一个[issue-#17979](https://github.com/npm/npm/issues/17979)，得出`5.4.2`版本后的规则。

+ `5.4.2`版本后：
  如果只有一个`package.json`文件，运行`npm install`会根据它生成一个`package-lock.json`文件，这个文件相当于本次`install`的一个快照，它不仅记录了`package.json`指明的直接依赖的版本，也记录了间接依赖的版本。
  
  如果`package.json`的`semver-range version`和`package-lock.json`中版本兼容(`package-lock.json`版本在`package.json`指定的版本范围内)，即使此时`package.json`中有新的版本，执行`npm install`也还是会根据`package-lock.json`下载。

  如果手动修改了`package.json`的`version ranges`，且和`package-lock.json`中版本不兼容，那么执行`npm install`时`package-lock.json`将会更新到兼容`package.json`的版本。

> 注意：`npm install`读取`package.json`创建依赖项列表，并使用`package-lock.json`来通知要安装这些依赖项的哪个版本。如果某个依赖项在`package.json`中，但是不在`package-lock.json`中，运行`npm install`会将这个依赖项的确定版本更新到`package-lock.json`中，不会更新其它依赖项的版本。

## 依赖版本选择的最佳实践

### 版本发布

+ 对外部发布一个正式版本的npm包时，把它的版本标为`1.0.0`。

+ 某个包版本发行后，任何修改都必须以新版本发行。

+ 版本号严格按照 `主版本号.次版本号.修订号` 格式命名。

+ 版本号发布必须是严格递增的。

+ 发布重大版本或版本改动较大时，先发布`alpha`、`beta`、`rc`等先行版本。

### 依赖范围选择

+ 主工程依赖了很多子模块，都是团队成员开发的npm包，此时建议把版本前缀改为~，如果锁定的话每次子依赖更新都要对主工程的依赖进行升级，非常繁琐，如果对子依赖完全信任，直接开启^每次升级到最新版本。

+ 主工程跑在`docker`线上，本地还在进行子依赖开发和升级，在`docker`版本发布前要锁定所有依赖版本，确保本地子依赖发布后线上不会出问题。

### 保持依赖一致。

+ 确保npm的版本在`5.6`以上，确保默认开启`package-lock.json`文件。

+ 由初始化成员执行`npm inatall`后，将`package-lock.json`提交到远程仓库。不要直接提交`node_modules`到远程仓库。

+ 定期执行 `npm update` 升级依赖，并提交 `lock` 文件确保其他成员同步更新依赖，不要手动更改`lock`文件。


### 依赖变更

+ 升级依赖: 修改`package.json`文件的依赖版本，执行`npm install`。
+ 降级依赖: 直接执行 `npm install package@version`(改动`package.json`不会对依赖进行降级)。注意改动依赖后提交lock文件。

## 其它的一些问题待补充
+ npm shrinkwrap
+ cnpm
+ yarn

+ npm install过程 （另一篇）
+ package.json剖析（另一篇）

## 参考

[comment]: 这位大佬很完整的写了全部的东西，tql
+ <http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%EF%BC%88%E4%B8%80%EF%BC%89npm%E5%8C%85%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%EF%BC%9F.html>


