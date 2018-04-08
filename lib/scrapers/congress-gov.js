const request = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'https://www.congress.gov/search'
const billUrl = 'https://www.congress.gov/bill/115th-congress/house-bill'

const DEFAULT_BILL_DESC = 'A summary is in progress.'

const scrape = (keywords) => { 
  bills = [];
  keywords.forEach((keyword) => {
    bills.push(getPage(keyword, itemNum))
  });

  return Promise.all(bills)
  .then((res) => {
    console.log(res)
    return res
  });
}

const getPage = (keyword, itemNum) => {

  baseParams = {
    search:    Array(keyword),
    source:   'legislation',
    congress: '115',
    pageSize: '25'
  }

  return request({ url: baseUrl, qs: baseParams})
  .then(res => {
    return request(billHRef(res))
  })
  .then((res) => {
    return parse(keyword, res)
  });
}

const billHRef = (page) => {
  // TODO: can also regex the num
  // Hardcoded HR, possible want to grab that as well
  return cheerio.load(page)('a', '.result-heading')[itemNum()].attribs.href
}

const parse = (keyword, page) => {
  let $ = cheerio.load(page);

  return {
    'title':    $('.legDetail', '.featured').text(),
    'sponsor':  $('a', '.standard01').text(),
    'status':   fixThisAbomination($('li.first.selected', '.bill_progress')),
    'keywords': keyword,
    'summary':  $('p', '#bill-summary').text() || DEFAULT_BILL_DESC
  }
}

const fixThisAbomination = (statusEl) => {
  // TODO: Can use cheerio better than this but time
  return statusEl.text().match(/\[description\] =>.+/)[0].split(' => ')[1]
}

const itemNum = () => Math.floor(Math.random() * 100) + 1

module.exports = scrape
