# Wordle words API

This is a small server based project built using mongoDB and Graphql Apollo Server.
The goal of this API is to host a subset of 5 letter words to be used in my portfolio page.

To use this API there is just one query that can be executed by any client with the following

```
fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-Content-Type-Options': 'nosniff',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                query: `
                        query {
                            words {
                                word
                            }
                        }`
            }),
        }).then(async result => {
            const arr = await result.json();
            const wordsArr = arr?.data.words || [];
            ...
        }).catch((err) => {
            console.log(err);
        });
```