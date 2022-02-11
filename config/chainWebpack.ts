import CompressionPlugin from "compression-webpack-plugin";

export default function (config: any) {
    config.merge({
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 1,
                automaticNameDelimiter: '.',
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test({resource}: any) {
                            return /[\\/]node_modules[\\/]/.test(resource);
                        },
                        priority: 10,
                    },
                },
            },
        }
    });
    if (process.env.NODE_ENV === 'production') {
        // Gzip压缩
        config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
            {
                test: /\.(js|css|html)$/i, // 匹配
                threshold: 10240, // 超过10k的文件压缩
                deleteOriginalAssets: false, // 不删除源文件
            },
        ])
    }
};