const fs = require('fs');
const POSTS_PATH = process.env.POSTS_PATH || './posts/';
const postReader = (function(){

    const indexConent = _readIndexContent(); // singleton
    
    function _readDir(path) {
        return fs.readdirSync(POSTS_PATH + path);
    }

    function _readFileContent(path) {
        const content = fs.readFileSync(POSTS_PATH + path);
        return JSON.parse(content);
    }

    function _readIndexContent() {
        return _readFileContent('index.json');
    }

    return {
        getEntries : function(from, to) {
            const rangeContent = indexConent.slice(from, to);
            const metadata = rangeContent.map(f => {
                const content = _readFileContent(f.path);
                delete content.content;
                return content;
            });
            return metadata;
        },
        getEntry : function(id) {
            const found = indexConent.find(f => {
                return f.id === id;
            });
            return _readFileContent(found.path);
        },

        totalPosts : function() {
            return indexConent.length;
        }
    }
})();

module.exports = postReader;