cd /root/ai-chat
git stash
./topsecret/pull.sh

cd /root/ai-chat/server
npm config set ignore-scripts true
npm i
npm config set ignore-scripts false

npm run build

# pm2 restart ai-chat