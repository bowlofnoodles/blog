# koa中转文件上传

## koa-body + FormData

<https://juejin.cn/post/6940168194346713102>

## 类似koa-proxy 透传参数 pipeRequest

``` javascript
import * as request from 'request';

const err = (message, status = 500) => ({
  message,
  status
});

export default async (ctx, requestOpt) => {
  const result = await new Promise(resolve => {
    try {
      const r = request(
        requestOpt.url,
        {
          ...requestOpt
        },
        (error, response, data) => {
          if (
            !error &&
            response.statusCode === 200
          ) {
            try {
              const res = JSON.parse(data);
              ctx.logger.log(`[transfer pipereqeust success] ${JSON.stringify(res)}`);
              resolve(res);
            } catch (err) {
              ctx.logger.log(`[transfer pipereqeust parse error] ${err}`);
              resolve(data);
            }
          } else {
            ctx.logger.log(`[transfer pipereqeust error] ${error}`);
            resolve(err(error));
          }
        }
      );
      ctx.req.pipe(r);
    } catch (err) {
      ctx.logger.log(`[transfer pipereqeust error] ${err}`);
      resolve(err(err));
    }
  });
  return result;
};

```

<https://gitlab.gz.cvte.cn/zhengnanhui/wechat-mini-platform/-/merge_requests/13/diffs?commit_id=cfcff3bc06af43f0537641619b35b9fffa663793>