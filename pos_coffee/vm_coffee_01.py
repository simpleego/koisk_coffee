def coffee_process(menu):   
    global user_coins

    if menu == '1':
        make_coffee('밀크')        
    elif menu == '2':
        make_coffee('설탕')  
    elif menu == '3':
        make_coffee('블랙')  
    elif menu == '4':
        print('동전입력')
        in_coins = int(input('메뉴에 알맞은 동전입력 : '))  
        user_coins += in_coins 
        print('user_coins: ',user_coins)
    else:
        print('잘못입력')

def make_coffee(coffee):
    global coffee_price, user_coins, vm_coins

    price = coffee_price[coffee]

    if user_coins >= price:
        print(coffee,' 커피 나왔습니다.')
        user_coins -= price
        vm_coins += price


def show_menu():  
    coffee_menu = """
        1. 밀크커피(300원)

        2. 설탕커피(300원)

        3. 블랙커피(200원)

        4. 동전입력

        5. 종료
    """ 
    print(coffee_menu)


user_coins = 0  # 사용자가 입력한 동전
vm_coins = 0 # 자판기가 판매한 동전
# coffee_price = [300,300,200]  # 커피 가격
coffee_price = {'밀크':300,'설탕':300,'블랙':200}  # 커피 가격

while True:

    show_menu()    

    menu = input('메뉴선택 : ')

    coffee_process(menu)

    print('입력한 동전: ', user_coins)

    if menu == '5':
        break

print('----------프로그램 종료---------------')