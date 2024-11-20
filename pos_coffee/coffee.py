import material as m

def coffee_process(menu):   
    global user_coins

    match menu:
        case '1':
            make_coffee('밀크')
        case '2':
            make_coffee('설탕')
        case '3':
            make_coffee('블랙')
        case '4':
            input_coins()            
        case 'a' | 'A':
            admin_total_sales()            
        case '_':
            print('잘못입력')

def make_coffee(coffee):
    global coffee_price, user_coins, vm_coins

    price = coffee_price[coffee] 

    if user_coins >= price:

        # 커피 제조과정
        if coffee == '밀크':
            if check_materials(coffee):
                m.coffee_material['coffee'] -= 10
                m.coffee_material['cream'] -= 20
                m.coffee_material['sugar'] -= 10
                print(coffee,' 커피 나왔습니다.')
            else:
                print(coffee,' 커피 재료 부족..')
        elif coffee == '설탕':
            if check_materials(coffee):
                m.coffee_material['coffee'] -= 10
                m.coffee_material['sugar'] -= 10
            else:
                print(coffee,' 커피 재료 부족..')
        elif coffee == '블랙':
            if check_materials(coffee):
                m.coffee_material['coffee'] -= 10            
            else:
                print(coffee,' 커피 재료 부족..')
        
        user_coins -= price
        vm_coins += price

    show_materials()

def check_materials(material):
    match material:
        case '밀크':
            if m.coffee_material['coffee'] >= 10 and \
                m.coffee_material['cream'] >= 20 and \
                m.coffee_material['sugar'] >= 10:
                return True
        case '설탕':
            if m.coffee_material['coffee'] >= 10 and \
                m.coffee_material['sugar'] >= 10:
                return True
        case '블랙':
            if m.coffee_material['coffee'] >= 10:
                return True            
        
    return False

def input_coins():
    global user_coins
    in_coins = -1

    print('동전입력')
    
    while True:
        try:
            in_coins = int(input('메뉴에 알맞은 동전입력 : ')) 
        except:
            print('동전은 숫자로 입력하세요')

        if in_coins > 0:
            user_coins += in_coins
            print('user_coins: ',user_coins)
            break

def admin_total_sales():
    print('총 판매금액 : ',vm_coins)

def show_materials():
    print(' --------- 커피 재고 ----------- ')
    print('커피 : ', m.coffee_material['coffee'])
    print('프림 : ', m.coffee_material['cream'])
    print('설탕 : ', m.coffee_material['sugar'])

def show_menu():  
    coffee_menu = """
        1. 밀크커피(300원)

        2. 설탕커피(300원)

        3. 블랙커피(200원)

        4. 동전입력

        a. 관리자 기능(금판매액)

        5. 종료
    """ 
    print(coffee_menu)

user_coins = 0  # 사용자가 입력한 동전
vm_coins = 0 # 자판기가 판매한 동전
# coffee_price = [300,300,200]  # 커피 가격
coffee_price = {'밀크':300,'설탕':300,'블랙':200} # 커피 가격

#input_coins()
make_coffee('밀크')
