echo "Switching to Master"
git checkout main

echo "Building front end app..."
cd client 
npm run build


echo "Deploying files to server..."
scp -r build/* pi@192.168.0.115:/var/www/192.168.0.115/
cd ..

echo "Deployed!"