Feature('chat-with-lucky-luke');

Scenario('test lucky luke is lucky', (I) => {
    I.amOnPage('https://fancy-chats.com:3443/')
    I.see('Fancy Chat')
    I.click('Fancy Chat')
    I.see('Lucky Luke')
    I.fillField('#input', 'Hi')
    I.wait(7)
    I.see(':)')
});
