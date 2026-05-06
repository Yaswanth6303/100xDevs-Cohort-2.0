docker build -t c2-w15-4-nextapp-bindmounts .
docker run -p 3000:3000 c2-w15-4-nextapp-bindmounts

- Now whatever changes i do in my host machine it will not effect in my container, To make that happen again i need
  to build the image to solve this we can use something called Bind Mounts. This will be binding the volume to my mac
  storge systemm like /Users/yaswanthgudivada/app if i change locally it will be changing in container also

docker run \
 -p 3000:3000 \
 -v $(pwd):/app \
 c2-w15-4-nextapp-bindmounts
