# qase-robot 🤖

Para configurar e executar testes com Qase no Windows usando o Robot Framework, supondo que você já tenha a sua conta cadastrada no QASE e com a criação de um projeto configurado na plataforma, você precisará das seguintes ferramentas e configurações:

# Ferramentas Necessárias
- Python: Versão 3.x instalada.
- Ambiente Virtual: Criado com python -m venv myenv e ativado com myenv\Scripts\activate.
- Robot Framework: Instalado com pip install robotframework.
- Qase Robot Framework Plugin: Instalado com pip install qase-robotframework.
- Bibliotecas Adicionais: Como robotframework-seleniumlibrary, se necessário ou dependendo da Library do Robot que irá utilizar, no meu caso, estou utilizando Appium + Robot 
# Configurações Necessárias:
- Arquivo qase.config.json: Contém token da API e código do projeto no Qase.
# Passos Adicionais
Criação de Testes: Desenvolva um teste de exemplo usando o Robot Framework.

# Agora, ensinarei o Passo a Passo: Configurar e Executar Testes com Qase no Windows

1. Criar e Ativar Ambiente Virtual
Abra o prompt de comando e execute os seguintes comandos para criar e ativar um ambiente virtual Python:

# Com o Prompt de Comando aberto, insira o código:

primeiro -> python -m venv myenv
segundo -> myenv\Scripts\activate

# 2. Instalar Robot Framework
Instale o Robot Framework usando o pip:

# Com o Prompt de comando aberto, insira o código:

pip install robotframework

# 3. Verificar Versão do Robot Framework
Verifique se o Robot Framework foi instalado corretamente:

# Com o Git bash aberto, insira o código:

robot --version

# 4. Instalar o Plugin Qase Robot Framework

Instale o plugin Qase para o Robot Framework:
# Insira o código:
]
pip install qase-robotframework

# 5. Verificar Detalhes da Instalação do Plugin Qase
Verifique os detalhes da instalação para confirmar que o plugin Qase foi instalado corretamente:

# Insira o código:
python -m pip show qase-robotframework

# 6. Instalar Bibliotecas Adicionais (Exemplo com AppiumLibrary)

Se você utilizar a Appium Library nos seus testes, instale-a usando o pip:

# Insira o código:
pip install robotframework-appiumlibrary

# 7. Verificar a Instalação das Bibliotecas
Verifique se as bibliotecas necessárias estão instaladas corretamente:

# Insira o código:
pip list

# 8. Criar e Configurar o Arquivo qase.config.json (no seu editor de código preferido, estou usando o VSCODE

Crie um arquivo com o nome: qase.config.json no diretório do seu projeto com as informações necessárias para o Qase:
# Copie e cole este código no seu arquivo de configuração criado:

json
Copiar código
{
  "mode": "testops",
  "testops": {
    "project": "YOUR_PROJECT_CODE",
    "api": {
      "token": "YOUR_API_TOKEN",
      "host": "qase.io"
    }
  },
  "environment": "local"
}

Observação: Substitua YOUR_PROJECT_CODE pelo código do seu projeto no Qase e YOUR_API_TOKEN pelo seu token de API do Qase.

Observação:
Este é um screenshot do Qase, gere o token de API no menu lateral da própria ferramenta:

![image](https://github.com/railenesantana/qase-robot/assets/141088075/45311fda-4f5b-4081-a622-8ddd0a25fc72)

Este é um screenshot do Qase, onde é exibido o código com o seu projeto criado:

![image](https://github.com/railenesantana/qase-robot/assets/141088075/589595f2-1c14-4bb4-89cb-09cd0272763a)


9. Criar o Arquivo de Teste 
Crie um arquivo de teste, para entendimento: neste caso, o nome do meu caso de teste de exemplo é: home.robot com um caso de teste básico utilizando o Robot Framework:

*** Settings ***

Library    AppiumLibrary

*** Test Cases ***


Deve abrir a tela principal

    Open Application   http://localhost:4723
    ...                platformName=Android
    ...                deviceName=Android Emulator
    ...                automationName=UIAutomator2
    ...                app=C:\\qa\\projects\\yodapp-robot\\app\\yodapp-beta.apk
    ...                udid=emulator-5554
    ...                autoGrantPermissions=true


    Wait Until Page Contains    Yodapp    10
    Wait Until Page Contains    Mobile Training    10
    Wait Until Page Contains    by Papito    10

    Close Application
    
# 10. Executar Testes com Qase Reporter

Para executar os testes e enviar os resultados para o Qase, utilize o seguinte comando no prompt de comando:
robot --listener qase.robotframework.Listener home.robot

Observação: Substitua o "test.robot", pelo nome do arquivo de teste que você irá executar.

Resultado da execução de teste automatizada no QASE em evidência:

![image](https://github.com/railenesantana/qase-robot/assets/141088075/977ba8ec-5f90-43cc-9e15-b7b6464160a7)


# Observações Finais

No arquivo "qase.config.json", certifique-se de substituir YOUR_API_TOKEN e YOUR_PROJECT_CODE pelos valores correspondentes do seu projeto e token no Qase. 
Esses passos garantem que seu ambiente esteja configurado corretamente para integrar e executar testes utilizando o Qase com o Robot Framework de forma eficiente e organizada no Windows.

Link importantes:

Documentação oficial de configuração do QASE com o Robot: https://github.com/qase-tms/qase-robotframework
Qase plataforma de gestão de testes para cadastrar-se: https://qase.io/

