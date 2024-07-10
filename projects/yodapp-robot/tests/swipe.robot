*** Settings ***

Resource    ../resources/base.resource

*** Test Cases ***
Deve poder remover o Darh Vader

    Start session
    Get started

    Navigate to    Star Wars
    Go to item    Lista    Darth Vader

    
