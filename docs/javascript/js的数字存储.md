# js中的数字存储

## 数字存储形式
js中的数字无论整数，小数都采用 `IEEE754规范` 双精度浮点数存储，即`64`位存储。`1`位标志位，`0`为正数，`1`为负数。`11`位指数位，`52`位尾数位。

<Img :src="$withBase('/double.png')" alt="double" />

`64`位比特又可分为三个部分：

- 符号位`S`：第 `1` 位是正负数符号位（`sign`），`0`代表正数，`1`代表负数。
- 指数位`E`：中间的 `11` 位存储指数（`exponent`），用来表示次方数。
- 尾数位`M`：最后的 `52` 位是尾数（`mantissa`），超出的部分自动进一舍零。

<Img :src="$withBase('/double1.png')" alt="double1" />

举个例子：
`4.5` 转化为二进制为 100.1。采用标准的科学计数就是`1.001 * 2 ^ 2`。


因指数位采用偏移二进制的方式记录，`11`位最大存取的整数位`2047`，为了区分正负，采用`1023`为中间数，大于`1023`则为正数，小于`1023`则为负数。就像这个例子指数位为`2`，则指数`11`位存储的数值为`1023 + 2 = 1025`。`1025`转换为二进制则为`10000000001`。

尾数为`1.001`，因为标准科学技术法尾数一定`> 0 且 < 2`，所以尾数部分的整数部分一定为`1`，故存储到尾数位中省略掉`首位1`。则`4.5`尾数位为`001 + 49个0(补全到52位)`。最终的公式变成：

<Img :src="$withBase('/double2.png')" alt="double2" />

故完整的`4.5`在js中的数字存储形式为：
`0（正数）10000000001（指数）001 + 49个0（尾数）`

> <http://www.binaryconvert.com/result_double.html>这个网址可以快速转换数值的二进制存储形式，也可快速从二进制存储转换为对应的十进制数字。可以用一些例子，自己做做验证一下。

## 0.1 + 0.2 !== 0.3


## 大数计算



