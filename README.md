# Salta Cano

Jogo de obstáculos desenvolvido com **HTML, CSS e JavaScript puro**. Pule sobre os canos, sobreviva pelo maior tempo possível e aumente sua pontuação.

**Versão atual: 0.1 — experimental.**

O projeto foi criado para aprender JavaScript na prática e ter uma primeira experiência de publicação na web. A proposta é evoluir em etapas, entendendo cada mudança antes de adicionar novas funcionalidades.

## Como jogar

A partida começa automaticamente ao abrir a página. Mario permanece à esquerda do cenário enquanto os canos se aproximam.

| Ação | Controle |
| --- | --- |
| Pular no teclado | `Espaço`, `↑` ou `W` |
| Pular com mouse ou toque | Clique com o botão esquerdo ou toque no cenário |
| Reiniciar | Após aparecer **Game Over**, pressione uma nova tecla ou clique/toque no cenário ou na mensagem |
| Pausar automaticamente | Troque para outra aba ou minimize o navegador |
| Continuar | Volte à aba do jogo |

- Um novo pulo só pode começar depois que o anterior termina.
- Segurar uma tecla não produz pulos automáticos.
- Espaço e seta para cima não rolam a página durante o controle do jogo.
- Ao bater em um cano, a pontuação para e Mario executa a animação de morte.
- O reinício só fica disponível quando a animação de morte termina.

### Pontuação

Você ganha **10 pontos por segundo de partida ativa**. O placar usa o tempo transcorrido, não a quantidade de canos ultrapassados.

O tempo em que a página fica oculta é descontado. Ao reiniciar, a pontuação volta a zero; esta versão ainda não salva recordes.

## Executar localmente

Não é necessário instalar dependências, Node.js ou executar uma etapa de build.

1. Baixe o repositório e extraia os arquivos, ou clone com Git:

   ```bash
   git clone https://github.com/Davi-Madruga/Flappy-Mario.git salta-cano
   ```

2. Abra a pasta do projeto (`salta-cano`, se usou o comando acima).
3. Abra o arquivo `index.html` em um navegador com suporte a JavaScript.

Mantenha as pastas `css`, `js`, `images` e `audio` junto do HTML para que os recursos sejam encontrados. Você também pode servir essa pasta com um servidor estático local de sua preferência.

A versão 0.1 tem foco inicial em computador. Os controles por toque estão implementados, mas o equilíbrio da dificuldade em telas pequenas ainda precisa de ajustes.

## Funcionalidades da versão 0.1

- Cenário com moldura, chão e nuvens animadas.
- Pulo com animação CSS e bloqueio de acionamentos simultâneos.
- Colisão por sobreposição de áreas retangulares, com margens ajustadas para Mario.
- Pontuação baseada no tempo ativo da partida.
- Efeitos sonoros de pulo e morte.
- Animação de morte encoberta pela camada de grama.
- Reinício por teclado, clique ou toque após o Game Over.
- Pausa das animações CSS, da verificação de colisão e da pontuação quando a página fica oculta.
- Retomada do movimento ao voltar à aba, inclusive durante o pulo ou a morte.
- Ajuste da duração do movimento do cano conforme a largura do cenário.

## Tecnologias e organização

| Tecnologia | Uso |
| --- | --- |
| HTML | Estrutura do cenário, placar, instruções e mensagem de fim de jogo |
| CSS | Layout, aparência, camadas e animações |
| JavaScript | Controles, estado da partida, colisão, pontuação e pausa |

```text
salta-cano/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── clouds.png
│   ├── game-over.png
│   ├── mario.gif
│   └── pipe.png
└── audio/
    ├── death-sound-effect.mp3
    └── jump-sound-effect.mp3
```

### Como o código funciona

O HTML carrega o script com `defer`, para que os elementos da página estejam disponíveis quando o JavaScript executar.

No CSS, as regras estão agrupadas em base da página, cenário, elementos do jogo, interface, estados e animações. A classe `pausado` interrompe as animações CSS sem reiniciá-las.

O JavaScript está organizado em elementos da página, configurações, estado, ações, loop, eventos e inicialização:

1. Os controles chamam `jump()`, que adiciona a classe do pulo quando permitido.
2. Um intervalo verifica as posições e atualiza os pontos a cada 10 ms, enquanto o jogo está ativo. Esse intervalo não garante uma taxa fixa de quadros.
3. `getBoundingClientRect()` fornece os retângulos usados para verificar a colisão.
4. Na colisão, o cenário e o placar param, e a animação de morte começa.
5. `animationend` encerra o estado de pulo ou libera o reinício ao fim da morte.
6. `visibilitychange` controla a pausa e acumula o tempo que deve ser descontado da pontuação.

O reinício usa `window.location.reload()` para começar uma nova partida.

## Limitações conhecidas

| Limitação | Comportamento atual |
| --- | --- |
| Dificuldade em telas pequenas | A velocidade do cano é constante em pixels CSS por segundo, mas ele completa o percurso e reaparece mais rapidamente em cenários estreitos. O pulo mantém a mesma duração. |
| Redimensionamento e zoom | Recalcular a duração durante a animação pode mudar a posição do cano abruptamente. O zoom do navegador também altera o tamanho visual do jogo. |
| Áudio | A reprodução pode ser bloqueada pelo navegador, não há tratamento de falhas nem controle de volume. Sons já iniciados podem continuar durante a pausa. |
| GIF de Mario | A pausa congela os movimentos CSS, mas não necessariamente os quadros internos do GIF. |
| Layout em telas baixas | A altura do cenário e as instruções podem exigir rolagem. |
| Persistência | Pontos e recordes não são armazenados entre partidas. |

## Próximos passos

- [x] Impedir rolagem por Espaço e seta para cima.
- [x] Pausar ao sair da aba e descontar o tempo ausente.
- [x] Documentar a versão 0.1.
- [ ] Publicar e validar o jogo no GitHub Pages.
- [ ] Avaliar o ajuste da frequência dos canos e da duração dos pulos para telas pequenas.
- [ ] Melhorar o comportamento ao redimensionar a janela em uma versão futura.
- [ ] Melhorar o gerenciamento e o tratamento de falhas do áudio em uma versão futura.

## Publicação

O destino planejado é o **GitHub Pages**. O projeto é estático e seus arquivos podem ser servidos sem backend ou compilação.

A URL pública será adicionada a este README depois que a publicação for concluída e verificada.

## Verificação manual

Antes de publicar uma atualização:

- Teste os três controles de teclado e o clique/toque.
- Segure uma tecla e pressione várias vezes durante o pulo para conferir o bloqueio de repetição.
- Verifique se Espaço e seta não rolam uma página com altura maior que a janela.
- Confira colisão, animação de morte e congelamento do placar.
- Tente reiniciar antes e depois de aparecer o Game Over.
- Troque de aba durante um pulo e durante a morte; volte e confira a continuidade das animações.
- Confirme que o tempo fora da aba não acrescenta pontos.
- Observe o comportamento em diferentes larguras e confira as limitações conhecidas.
- Após a publicação, abra a URL pública e confira imagens, sons e uma partida completa.

## Autoria e recursos

Projeto de estudo de [Davi Madruga](https://github.com/Davi-Madruga).

As referências visuais a Mario fazem parte da proposta temática do jogo; este é um projeto de estudo não oficial. A origem e os créditos específicos das imagens e dos efeitos sonoros ainda precisam ser documentados.

O repositório ainda não inclui um arquivo de licença. Este README não atribui uma licença aos recursos de terceiros.
