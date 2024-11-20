from coffee import show_menu, coffee_process
import coffee

menu = '0'

while menu != '5':

    show_menu() 
    menu = input('메뉴선택 : ')
    coffee_process(menu)
    print('잔 액: ', coffee.user_coins)
    

print('---프로그램 종료---')