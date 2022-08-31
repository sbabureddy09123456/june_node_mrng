>>page 1

>(Get) List of cities
# http://localhost:9100/location

>(Get) List of restaurants

# http://localhost:9100/restaurants

>(Get) List of restaurants with respect to city
# http://localhost:9100/restaurants?stateId=stateid

>(Get) List of mealType
# http://localhost:9100/mealType

>>>page 2

>(Get) List of restaurants with respect to mealType

# http://localhost:9100/restaurants?mealId=2

>>(Get) Filter with respect to cost
>>(Get) Filter with respect to Cuisine

# http://localhost:9100/filter/1?cuisine=1

>>(Get) Fliter wrt Cost
# http://localhost:9100/filter/1?lCost=500&hCost=1000

>>(Get) Filter WRT to Price

# http://localhost:9100/filter/1?lCost=500&hCost=1000&sort=-1

>>(Get) Pagination
# http://localhost:9100/filter/1?lsort=-1&skip=0&limit=3


page 3

>>(Get) Details of Restaurants
# http://localhost:9100/details/630b07289f7cc37fbdec23f5

>>(Get) Menu of Restaurants


#  http://localhost:9100/menu/3

page 4
>>(post) All the menu details
# localhost:9100/menuItem
# { "id":[4,9,8]}
>>(post) Place order

# localhost:9100/placeOrder
# {
    "orderId":2,
    "name":"Babu",
    "email":"sbabureddy16@gmail.com",
    "address":" penumur",
    "phone":7013656510,
    "cost":1000,
    "menuItem":[
        5,8,9
    ]
}


page 5
>>(Get) List of order placed
# localhost:9100/order
>>(Get) Orders WRT email

# localhost:9100/order?email=sbabureddy16@gmail.com

>>(put) Update order
# localhost:9100/updateorder
# {
    "_id":"630ce00f093408690a8e1427",
    "status":"Delivered"
}
>>(Delete) Delete order
# localhost:9100/removeOrder
# {
    "_id":"630ce00f093408690a8e1427"
}














