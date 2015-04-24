Installing DreamFactory on Heroku:

For a basic installation of DreamFactory on Heroku, click the button below and follow the instructions. 

<p><a href="https://heroku.com/deploy?template=https://github.com/dreamfactorysoftware/dsp-core/"><img src="https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67" alt="Deploy" data-canonical-src="https://www.herokucdn.com/deploy/button.png" style="max-width:100%;"></a></p>

Follow these instructions if you need to customize the image:

1. Click the "Deploy to Heroku" button on this page and follow the instructions to create a "staging" environment.
2. Clone the repo using the instructions under the "Make your first edit" link.
3. Make your changes (customize the theme, write a script, etc).
4. Push your changes to the staging environment.
5. Once everything is working properly, click the button again to create a "production" environment.
6. Inside your git clone of the staging environment, `git remote add production git@heroku.com:the-name-of-the-application-you-just-created.git`.
7. `git push -f production master`.