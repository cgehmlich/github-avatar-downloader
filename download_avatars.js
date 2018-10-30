var request = require('request');
var input = process.argv.splice(2);
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    if (!input[0] || !input[1]) {
        console.log("Must enter user name and repository name!")
        return;
    }
    repoOwner = input[0];
    repoName = input[1];
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request', 
            "Authorization": 'token '+ 'd8420f2231f8146bb6da6df9890944864219add6'
        }
    }
    request(options, function (err, res, body) {
        var repos = JSON.parse(body);
        cb(repos);
    })     
}
function downloadImageByURL(url, filePath) {
    var https = require('https');
    var fs = require('fs');
    request.get(url)
        .on('error', function (err) {
            throw err;
        })
        .on('response', function (response) {
            console.log('Response Status Code: ', response.statusCode, response.statusMessage, response.headers['content-type']);
            var ext = response.headers['content-type'];
            // console.log(ext)
            // var slash = (ext.indexOf('/'))
            // console.log(slash)
            // extension = ext.slice(slash+1)
            // console.log(extension)
        })
        .pipe(fs.createWriteStream(filePath))// + '.' + extension))
        .on('end', function () {
            console.log('Download comnplete');
        })
}
function getAvatars(repos) {
    repos.forEach(function (repo) {
        downloadImageByURL(repo.avatar_url, "./avatars/" + repo.login + ".png")
    })
}
getRepoContributors("jquery", "jquery", getAvatars) // (err, result) {
    //     console.log("Errors:", err);
    //     console.log("Result:", result);
    // })