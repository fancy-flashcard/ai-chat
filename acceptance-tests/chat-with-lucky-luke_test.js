Feature('chat-with-lucky-luke');

Scenario('test something', (I) => {
    I.amOnPage('https://fancy-chats.com:3443/')
    I.see('Fancy Chat')
    I.click('Fancy Chat')
    I.see('Lucky Luke')
    I.fillField('#input', 'Hi')
    // I.wait(5)
    // I.see('Hi')
});
