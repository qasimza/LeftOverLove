from requests import put, post, get, delete

BASE_URL = 'https://leftover-love-1.ue.r.appspot.com/'

# Testing Recipient
RECIPIENT_URL = 'recipient'

# 1. Add a new recipient
print(post(BASE_URL+RECIPIENT_URL, json={"_id":"2", "name": "2nd Recipient"}).text)
# 2. Retrieve recipient
print(get(BASE_URL+RECIPIENT_URL, json={"_id": "2"}).text) 
# 3. Update recipient
print(put(BASE_URL+RECIPIENT_URL+'/62', json={'$set': {'name': 'ASPARAGUS'}}).text) 
# 4. Delete recipient
print(delete(BASE_URL+RECIPIENT_URL+'/62').text) 

# Testing Supplier
SUPPLIER_URL = 'supplier'

# 1. Add a new supplier
print(post(BASE_URL+SUPPLIER_URL, json={"_id":"13", "name": "Testing Post supplier", "phone":"5134456456"}).text)
# 2. Retrieve supplier - _id, phone, other
print(get(BASE_URL+SUPPLIER_URL, json={"_id": "112"}).text) 
# print(get(BASE_URL+SUPPLIER_URL, json={"phone": "5134456456"}).text) 
print(get(BASE_URL+SUPPLIER_URL, json={"name": "Testing Post supplier"}).text)
# 3. Update supplier
print(put(BASE_URL+SUPPLIER_URL+'/112', json={'$set': {'name': 'NOT az ASPARAGUS'}}).text) 
# 4. Delete supplier
print(delete(BASE_URL+SUPPLIER_URL+'/112').text) 

# Testing Supplier
ITEMS_URL = 'items'

# 1. Add a new item
print(post(BASE_URL+ITEMS_URL, json={"_id":"23", "name": "Chicken Parm", "type":"food(italian)"}).text)
print(post(BASE_URL+ITEMS_URL, json={"_id":"33", "name": "Noodles", "type":"food(chinese)"}).text)
print(post(BASE_URL+ITEMS_URL, json={"_id":"25", "name": "Fried Rice", "type":"food(chinese)"}).text)

# 2. Retrieve item - _id, phone, other
print(get(BASE_URL+ITEMS_URL, json={"_id": "13"}).text) 
print(get(BASE_URL+ITEMS_URL, json={"type":"food(chinese)"}).text) 
# 3. Update item
print(put(BASE_URL+ITEMS_URL, json={'query': {"type":"food(chinese)"}, 'update': {'$set': {'name': 'Lo Mein'}}}).text) 
# 4. Delete item
print(delete(BASE_URL+ITEMS_URL, json={"type":"food(chinese)"}).text) 