import { route } from 'next/dist/server/router'
import { useRouter, Router } from 'next/router'
import { redirect } from 'next/dist/server/api-utils'

//TODO: init the git hub client

export default async(req,res) => {
    return new Promise((resolve, reject) => {
        if (req.method == "POST"){
            const repo = req.body.gitRepo
            //TODO: connect to github here and try to pull the repo code
            console.log('repo from the API call',repo)

        } else{
            console.log("no repo found")
        }
    })

}