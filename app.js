var imagePath = "/Users/leondo/Desktop/canvas101/1.png"
var username = '';
var password = '';
var caption = '';




// ========================================================================




var casper = require('casper').create();
var x = require('casper').selectXPath;

casper.userAgent('Mozilla/4.0 (comptible; MSIE 6.0; Windows NT 5.1)')

casper.start();




// ========================================================================



getImage();
function getImage(){
    casper.thenOpen('https://leon-do.github.io/Instagram-Bot-Art/')

    casper.reload();

    casper.then(function(){

        this.capture("1.png",
            {
                top: 0,
                left: 0,
                width: 640,
                height: 640
            },
            {
                quality:100
            }
        )

        postImage();

    })

}//getImage




// ========================================================================

function postImage(){

    casper.thenOpen('https://www.golchess.com/instagram.html',function() {

        console.log('typing keys...')

        this.sendKeys(x('/html/body/table/tbody/tr/td[1]/form/input[1]'), username);
        this.sendKeys(x('/html/body/table/tbody/tr/td[1]/form/input[2]'), password);
        this.sendKeys(x('/html/body/table/tbody/tr/td[1]/form/textarea'), caption);

        this.page.uploadFile('input[name=file]', imagePath);

        this.wait(60000,function(){
            console.log('waiting for click...')
            this.click(x('/html/body/table/tbody/tr/td[1]/form/input[4]'))
            console.log('posted photo')

            this.wait(60000,function(){
                getImage();
            })//wait

        })//wait

    });//thenOpen

}//post image;




casper.run();
