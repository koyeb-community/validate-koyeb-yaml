const core = require('@actions/core');
const glob = require('@actions/glob');
const fs = require('fs');
const https = require('https');

(async function() {
    try {
        const patterns = core.getInput('patterns', {required: true}).split(',')
        core.info(`using patterns: ${patterns}`)
        const globber = await glob.create(patterns.join('\n'))
        const files = await globber.glob()
        for (const f of files) {
            core.info(`Validating ${f}`)
            let reader = fs.createReadStream(f)
            let p = new Promise((resolve, reject) => {
                let req = https.request({
                    method: 'POST',
                    hostname: 'app.koyeb.com',
                    path: '/v1/validate_yaml'
                }, (res) => {
                    res.setEncoding('utf-8')
                    let body = '';
                    res.on('data', (chunk) => {
                        body += chunk;
                    })
                    res.on('end', () => {
                        resolve({statusCode: res.statusCode, body: JSON.parse(body)})
                    })
                })
                reader.pipe(req)
                reader.on('end', () => {
                    req.end();
                })
            })
            let {statusCode, body} = await p
            core.debug(`Got result ${statusCode} body: ${JSON.stringify(body)}`)
            if (statusCode !== 200) {
                if (body.fields && body.fields[0] && body.fields[0].description) {
                    core.setFailed(body.fields[0].description)
                } else {
                    core.setFailed(body)
                }
            } else {
                core.info(`file ${f} is ok`)
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
})()

