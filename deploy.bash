cd /root/ai-chat
git stash
./topsecret/pull.sh

cd /root/ai-chat/server
npm config set ignore-scripts true
npm i
npm config set ignore-scripts false

npm run build

cd /root/ai-chat/client
npm i 
npm i tccomponents_vue
npm run build
cp -a /root/ai-chat/client/dist/* /root/ai-chat/static-assets

pm2 restart ai-chat