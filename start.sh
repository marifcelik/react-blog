init() {
    user_register="user1"
    user_password="123123"
    payload="{\"username\":\"$user_register\",\"password\":\"$user_password\"}"
    url="http://localhost:3000"
    curl -X POST -s -i -H "Content-Type: application/json" -d $payload "$url/auth/register"
    echo "User $user_register registered"

    response=$(curl -s -H "Content-Type: application/json" -d "$payload" "$url/auth/login")
    token=$(echo "$response" | jq -r '.token')

    echo "creating 14 posts for $user_register"
    for i in {1..14}
    do
        payload="{\"title\":\"Post $i\",\"content\":\"Content of post $i\"}"
        echo "creating post $i"
        curl -X POST -s -i -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d "$payload" "$url/posts"
        sleep 0.25
    done
}

docker compose up -d
sleep 5

if [ "$1" == "--init" ]; then
    init
fi