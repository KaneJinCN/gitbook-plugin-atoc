var toc = require('markdown-toc');
var slug = require('github-slugid');

module.exports = {
    book: {
      assets: './assets',
      css: [
        "atoc.css"
      ],
      js: [
        "atoc.js"
      ]
    },
    hooks: {
        "page:before": function (page) {
            page.content = toc.insert(page.content, {
                titleize: function (str) {
                    if (hrefPattern.test(str)) {
                        return str.replace(hrefPattern, '');
                    } else {
                        return str;
                    }
                },
                slugify: function (str) {
                    var res = str;
                    if (hrefPattern.test(str)) {
                        res = hrefPattern.exec(str)[0];
                    }
                    return slug(res.replace(/&.*?;/g, ''));
                },
                bullets: '*'
            });
            if (this.options.pluginsConfig.atoc.addClass) {
                var className = this.options.pluginsConfig.atoc.className || 'atoc';
                page.content = page.content + '\n\n\n<script type="text/javascript">var className=\'' + className + '\';</script>';
            }
            return page;
        }
    }
};
