var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request'
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
        })
        // console.log(filePath)
        .pipe(fs.createWriteStream(filePath))
        // console.log("3")
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