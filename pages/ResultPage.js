let { selectEl } = require('../lib/protractor');

function LandingPage() {
    this.resultHeadings = by.css('ol#b_results li.b_algo h2 a, ol#b_results li.b_ans div div h2 a');
    this.resultPageButtons = by.css('.ent-dtab-style-content.ent-dtab-curr-content a');
    
    this.clickAndGetResult = async function() {
        let btns = element.all(this.resultPageButtons);
        return await btns.count().then(count => {
            count -= 1;
            let allResultPromise = [];
            for(i = 0; i < count; i++) {
                btns.get(i).click();
                allResultPromise.push(this.getResult())
            }
            return Promise.all(allResultPromise)
        })
    }
    
    this.getResult = async function() {
        let resItems = element.all(this.resultHeadings);
        return await resItems.map(el => el.getText())
    }
}
module.exports = new LandingPage(); 