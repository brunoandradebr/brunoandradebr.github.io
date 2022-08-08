// ************************************************* //
// *****                                  ********** //
// *****         {Bruno Andrade}          ********** //
// ***** bruno.faria.andrade[at]gmail.com ********** //
// *****                                  ********** //
// ************************************************* //





const MOBILE = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Windows Phone/i);

let $ = (element) => document.querySelectorAll(element)
let trace = (content) => console.log(content)

let utils = {

    isIOS: ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0,

    /**
    * Creates a html fragment from a html string 
    */
    createHTMLFragment: (htmlstring) => {

        let range = document.createRange()

        range.setStart(document, 0)

        return range.createContextualFragment(htmlstring)

    }

}








let apper = {

    alreadyInitialized: false,

    initialize: (callback) => {

        apper.component.initialize(callback)

    },

    component: {

        initialize: (callback) => {

            // components that initialize only once
            if (apper.alreadyInitialized == false) {

                apper.component.app.initialize()
                apper.component.navigator.initialize()

                // there is no initialization callback, set default navigation behavior 
                if (!callback || typeof (callback) != 'function') {
                    apper.component.app.onnavigation()
                }

            }

            // components that needs to be initialized ever a new content is inserted to DOM
            apper.component.drawer.initialize()
            apper.component.scroll.initialize()
            apper.component.anchor.initialize()

            apper.component.app.resize()

            if (callback && typeof (callback) == 'function')
                callback()

        },





        /**
         * Initialize app common tasks
         * 
         * apper required structure :
         * 
         * <body>
         *    <app>
         *        <main>
         *            <content> </content>
         *        </main>
         *    </app>
         * </body>
         * 
         */
        app: {

            self: null,
            overlay: null,
            header: null,
            main: null,
            footer: null,

            initialize: () => {

                // cache app components
                apper.component.app.self = $('app')[0]
                apper.component.app.header = $('app header')[0]
                apper.component.app.main = $('app main')[0]
                apper.component.app.footer = $('app footer')[0]

                if (!apper.component.app.self) {
                    alert('You need to add <app> to document body')
                    return false
                }

                if (!apper.component.app.main) {
                    alert('You need to add <main> to <app>')
                    return false
                }

                // already initialized
                if (apper.alreadyInitialized == false) {
                    apper.alreadyInitialized = true
                }

                apper.component.app.self.setAttribute('initialized', '')

                // set default css style
                apper.component.app.setDefaultStyle()

                // initialize overlay element
                apper.component.overlay.initialize()

                // set main with scroll flag
                apper.component.app.main.setAttribute('scroll', '')

                // refresh components if a new content is inserted to the app
                apper.component.app.self.addEventListener('DOMNodeInserted', (e) => {
                    apper.component.initialize()
                })

                // ever app resize
                window.addEventListener('resize', (e) => {
                    setTimeout(() => {
                        apper.component.app.resize()
                    }, 100);
                })

                // prevent body scroll and zoom -- TODO add exception tag
                apper.component.app.self.addEventListener('touchstart', (e) => {
                    if (!e.target.closest('[scroll]'))
                        e.preventDefault()
                })

                // initial resize
                apper.component.app.resize()

                // scroll to top
                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 80);

            },

            setDefaultStyle: () => {

                let apperStyle = document.createElement('style');

                apperStyle.textContent = `
                    
                    @import url('https://fonts.googleapis.com/css?family=Press+Start+2P|Roboto|Roboto+Condensed');
                    
                    :root {
                        --primary: #fafafa;
                        --primary-variant: #fff;
                        --secondary: #333;
                        --secondary-variant: #000;
                        --accent: #ffc52a;
                        --info: #e8e8e8;
                    }

                    * {
                        padding : 0;
                        margin : 0;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                        -webkit-touch-callout: none;
                    }

                    html, body{
                        font-family: 'Roboto Condensed', sans-serif;
                        font-size: 16px;
                        line-height: 25px;
                        overflow : hidden;
                        background-color: var(--primary-variant);
                    }

                    h1, h2, h3 {
                        font-weight: normal;
                    }

                    app{
                        display: flex;
                        flex-direction: column;
                    }

                    overlay{
                        position: fixed;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.5);
                        z-index: -999;
                        transition: opacity .3s;
                        opacity: 0;
                    }

                    header {
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        padding: 10px 10px;
                        background-color: var(--primary);
                        box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.05);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }

                    content{
                        display: flex;
                        flex-direction:column;
                        overflow-wrap: break-word;
                        padding: 20px;
                    }

                    [scroll]{
                        display:grid;
                        overflow-y: auto;
                        overflow-x: hidden;
                        box-sizing: border-box;
                        -webkit-overflow-scrolling: touch;
                    }
                    [scroll]::-webkit-scrollbar {
                        width: 8px;
                    }
                    [scroll]::-webkit-scrollbar-track {
                        background: rgba(0,0,0,0.1);
                    }
                    [scroll]::-webkit-scrollbar-thumb {
                        background: rgba(0,0,0,0.3);
                        border-radius: 5px;
                    }
                    [scroll]::-webkit-scrollbar-thumb:hover {
                        background: rgba(0,0,0,0.5);
                    }

                    drawer{
                        position: fixed;
                        z-index: 3;
                        width: 80vw;
                        max-width: 300px;
                        height: 100%;
                        padding: 0px;
                        opacity: 0;
                        background-color: var(--primary-variant);
                        transition: transform .3s;
                        transform: translate3D(-100vw, 0px, 0px);
                        box-shadow: 1px 0px 1px 1px rgba(0, 0, 0, 0.1);
                    }

                    drawer ul li {
                        display: flex;
                    }
                    
                    drawer ul separator {
                        display: block;
                        width: 90%;
                        height: 1px;
                        margin-left: 10%;
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                    
                    drawer ul li anchor {
                        display: block;
                        width: 100%;
                        padding: 12px;
                        margin: 1px 0px;
                    }
                    
                    drawer ul li anchor.active {
                        background-color: rgba(0, 0, 0, 0.03);
                    }

                    anchor{
                        cursor: pointer;
                    }

                `;

                document.head.insertAdjacentElement('afterbegin', apperStyle);

            },

            resize: () => {

                let header = apper.component.app.header
                let main = apper.component.app.main
                let footer = apper.component.app.footer

                let headerHeight = header ? header.clientHeight : 0
                let footerHeight = footer ? footer.clientHeight : 0

                // resize main height based on header and footer height
                main.style.height = (window.innerHeight - (headerHeight + footerHeight)) + 'px'

                // auto resize element's height based on others elements ex: <div autoHeight="header|footer">...</div>
                apper.component.app.autoResizeElementsHeight()


            },

            autoResizeElementsHeight: () => {

                let autoHeightElements = $('*[autoHeight]')

                autoHeightElements.forEach((element) => {

                    let totalHeight = window.innerHeight

                    let others = element.getAttribute('autoHeight').split('|')

                    others.forEach((other) => {

                        totalHeight -= $(other)[0].clientHeight

                    })

                    element.style.height = totalHeight + 'px'

                })

            },

            onnavigation: (callback) => {

                apper.component.app.self.addEventListener('navigation', (e) => {

                    // update target container content
                    $(e.targetContainer)[0].innerHTML = ''
                    $(e.targetContainer)[0].appendChild(e.content)

                    // close all drawers
                    if (e.closeDrawer == "true") {
                        $('drawer').forEach((drawer) => {
                            apper.component.drawer.close(drawer)
                        })
                    }

                    $('anchor.active').forEach((activeAnchor) => {
                        activeAnchor.className = ''
                    })
                    $('anchor[path="' + e.newPage + '"]').forEach((anchor) => {
                        anchor.className = 'active'
                    })

                    // show elements on right context
                    $('*[context]').forEach((element) => {

                        let context = element.getAttribute('context')

                        // exception ex: !page
                        if (context[0] == '!') {
                            if (!e.newPage.match(new RegExp(context.substr(1), 'gi'))) {
                                element.style.display = 'inherit'
                            } else {
                                element.style.display = 'none'
                            }
                        } else {
                            if (e.newPage.match(new RegExp(context, 'gi'))) {
                                element.style.display = 'inherit'
                            } else {
                                element.style.display = 'none'
                            }
                        }

                    })

                    // force scroll main 1px vertical -- avoid screen edge safari
                    $('main')[0].scrollTop = 1

                    apper.component.app.ontransition($(e.targetContainer)[0], e.transitionStart, e.transitionEnd, () => {

                        // call user callback
                        if (callback)
                            callback(e.oldPage, e.newPage, e.content, $(e.targetContainer)[0])

                    })

                })

            },

            ontransition: (container, start = [], end = [], callback) => {

                if (start != '') {
                    if (start.toLowerCase() == 'left') {
                        start = {
                            "opacity": 0,
                            "transform": "translate3D(-100vw, 0px, 0px)"
                        }
                    } else if (start.toLowerCase() == 'right') {
                        start = {
                            "opacity": 0,
                            "transform": "translate3D(100vw, 0px, 0px)"
                        }
                    }
                    else {
                        start = JSON.parse(start)
                    }
                } else {
                    start = {
                        "opacity": 0,
                        "transform": "translate3D(-100vw, 0px, 0px)"
                    }
                }
                if (end != '') {
                    end = JSON.parse(end)
                } else {
                    end = {
                        "opacity": 1,
                        "transform": "translate3D(0px, 0px, 0px)"
                    }
                }

                container.style.transition = 'none'

                for (let i in start) {
                    let property = i
                    let value = start[i]
                    container.style[property] = value
                }

                setTimeout(() => {

                    container.style.transition = 'background-color .3s, opacity .9s, transform .3s'

                    for (let i in end) {
                        let property = i
                        let value = end[i]
                        container.style[property] = value
                    }

                    setTimeout(() => {
                        $('[scroll]').forEach((scrollable) => {
                            scrollable.scrollTop = 1
                        })

                        // auto resize element's height based on others elements ex: <div autoHeight="header|footer">...</div>
                        apper.component.app.autoResizeElementsHeight()
                    }, 80);

                    setTimeout(() => {
                        callback()
                    }, 300);

                }, 11)
            }

        },


        /**
         * overlay - added by apper
         */
        overlay: {

            initialize: () => {

                // create overlay element and add to app
                apper.component.app.self.insertAdjacentHTML('afterbegin', '<overlay></overlay>')

                // cache overlay element
                apper.component.app.overlay = $('overlay')[0]

                // close all drawers touching overlay
                apper.component.app.overlay.addEventListener('touchend', (e) => {

                    e.preventDefault()

                    $('app drawer').forEach((drawer) => {
                        apper.component.drawer.close(drawer)
                    })

                })
                apper.component.app.overlay.addEventListener('click', (e) => {
                    $('app drawer').forEach((drawer) => {
                        apper.component.drawer.close(drawer)
                    })
                })

                // overlay transition end event
                apper.component.app.overlay.addEventListener('transitionend', (e) => {

                    let opacity = window.getComputedStyle(apper.component.app.overlay).opacity | 0

                    // *hide* overlay
                    if (opacity == 0) {
                        apper.component.app.overlay.style.zIndex = -666
                    }

                })

            }

        },


        /**
         * scroll - <any scroll> content.. </any>
         */
        scroll: {

            initialize: () => {

                let scrollables = $('[scroll]')

                scrollables.forEach((scroll) => {
                    apper.component.scroll.construct(scroll)
                })

            },

            construct: (element) => {

                // if already initialized
                if (element.hasAttribute('initialized'))
                    return false

                // flag as initialized
                element.setAttribute('initialized', '')

                // touch start
                element.addEventListener('touchstart', (e) => {

                    // avoid zoom
                    if (e.touches.length > 1)
                        e.preventDefault()

                    element.touchTimestamp = window.performance.now()
                    element.touchY = e.touches[0].clientY

                    // get scroll container of the target touched
                    let scrollContainer = e.target.closest('[scroll]')

                    // if container has no content to be scrolled
                    let maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight

                    if (maxScroll == 0)
                        e.preventDefault()

                })

                // touch end
                element.addEventListener('touchend', (e) => {

                    let deltaY = e.changedTouches[0].clientY - element.touchY

                    if (e.target.tagName == 'A') {
                        if (Math.abs(deltaY) == 0)
                            window.location = e.target.href
                    }

                })

                // prevent scroll edge
                element.addEventListener('scroll', (e) => {

                    let target = e.target

                    if (target.scrollTop <= 0) {
                        target.scrollTop = 1
                        e.preventDefault()
                    }

                    let maxScroll = target.scrollHeight - target.clientHeight

                    if (target.scrollTop >= maxScroll) {
                        target.scrollTop = maxScroll - 1
                        e.preventDefault()
                    }

                })

                setTimeout(() => {
                    element.dispatchEvent(new Event('scroll'))
                }, 11);

            }

        },


        /**
         * drawer - <drawer> content.. </drawer>
         */
        drawer: {

            initialize: () => {

                let drawers = $('drawer')

                drawers.forEach((drawer) => {
                    apper.component.drawer.construct(drawer)
                })

            },

            construct: (element) => {

                // if already initialized
                if (element.hasAttribute('initialized'))
                    return false

                // start from top
                if (element.hasAttribute('top')) {
                    element.style.transform = 'translate3D(0px, -100vh, 0px)'
                }
                // start from bottom
                if (element.hasAttribute('bottom')) {
                    element.style.transform = 'translate3D(0px, 100vh, 0px)'
                }
                // start from right
                if (element.hasAttribute('right')) {
                    element.style.transform = 'translate3D(100vw, 0px, 0px)'
                }

                // get all triggers
                let triggers = $(element.getAttribute('trigger'))

                // trigger touch
                triggers.forEach((trigger) => {
                    trigger.addEventListener('touchstart', (e) => {
                        e.preventDefault()
                        apper.component.drawer.open(element)
                    })
                    trigger.addEventListener('click', (e) => {
                        apper.component.drawer.open(element)
                    })
                })

                // flag as scroll component
                // drawer will be set as initialized by scroll initializer
                element.setAttribute('scroll', '')

            },

            open: (element) => {
                element.style.transform = 'translate3D(0px, 0px, 0px)'
                element.style.opacity = 1
                apper.component.app.overlay.style.zIndex = 3
                apper.component.app.overlay.style.opacity = 1
            },

            close: (element) => {

                if (element.hasAttribute('right')) {
                    element.style.transform = 'translate3D(100vw, 0px, 0px)'
                }
                else if (element.hasAttribute('top')) {
                    element.style.transform = 'translate3D(0px, -100vh, 0px)'
                }
                else if (element.hasAttribute('bottom')) {
                    element.style.transform = 'translate3D(0px, 100vh, 0px)'
                } else {
                    element.style.transform = 'translate3D(-100vw, 0px, 0px)'
                }

                apper.component.app.overlay.style.opacity = 0

            }

        },


        /**
         * API - component to navigate
         * ex : apper.component.navigate.navigate('path')
         */
        navigator: {

            /**
             * cached pages
             */
            cached: {},

            initialize: () => {

                // ever a navigation occur
                window.addEventListener('popstate', (e) => {

                    let state = e.state

                    let navigationEvent = new Event('navigation')

                    if (state) {
                        navigationEvent.newPage = e.state.newPage
                        navigationEvent.oldPage = e.state.oldPage
                    } else {
                        navigationEvent.newPage = null
                        navigationEvent.oldPage = null
                    }

                    navigationEvent.targetContainer = e.state.targetContainer
                    navigationEvent.transitionStart = e.state.transitionStart
                    navigationEvent.transitionEnd = e.state.transitionEnd
                    navigationEvent.closeDrawer = e.state.closeDrawer

                    // cached content or request a new content
                    if (apper.component.navigator.cached[e.state.newPage]) {
                        navigationEvent.content = utils.createHTMLFragment(apper.component.navigator.cached[e.state.newPage])
                        apper.component.app.self.dispatchEvent(navigationEvent)
                    } else {

                        apper.component.navigator.loadContent(e.state.newPage).then((content) => {

                            // create tmp element to append content and get html fragment string
                            let tmpHTML = document.createElement('div')
                            tmpHTML.appendChild(content)

                            navigationEvent.content = utils.createHTMLFragment(tmpHTML.innerHTML)
                            apper.component.navigator.cached[e.state.newPage] = tmpHTML.innerHTML
                            apper.component.app.self.dispatchEvent(navigationEvent)

                        })

                    }

                })

                // on enter app get current page
                let currentPage = window.location.search.substr(1)

                let startAnchor

                // decides start page
                if (currentPage != '') {

                    let pages = currentPage.split('/')

                    // if start page has sub pages - TODO - recursive navigation
                    if (pages.length > 2) {

                        apper.component.navigator.navigate(pages[0] + '.html')

                        setTimeout(() => {
                            apper.component.navigator.navigate(currentPage)
                        }, 80);

                        return false
                    }

                    startAnchor = $('anchor[path="' + currentPage + '"]')[0]

                } else {
                    startAnchor = $('anchor[start]')[0]
                }

                if (startAnchor) {

                    let startPage = startAnchor.getAttribute('path')
                    let targetContainer = startAnchor.getAttribute('target') || 'content'
                    let transitionStart = startAnchor.getAttribute('transitionStart') || []
                    let transitionEnd = startAnchor.getAttribute('transitionEnd') || []
                    let closeDrawer = startAnchor.getAttribute('closeDrawer') || "true"

                    apper.component.navigator.navigate(startPage, targetContainer, transitionStart, transitionEnd, closeDrawer)

                }

            },

            /**
             * load a external content
             * @return HTMLFragment
             */
            loadContent: (path) => {

                return fetch(path, { mode: 'no-cors' }).then((response) => {

                    return response.text().then((content) => {

                        return utils.createHTMLFragment(content)

                    })

                })

            },

            /**
             * create a new state to history, change page without leaving
             * dispatch PopStateEvent 
             */
            navigate: (path, targetContainer = 'content', transitionStart = [], transitionEnd = [], closeDrawer = true) => {

                let newPage = path

                if (newPage == 'back') {
                    history.back()

                    $('anchor[path="' + history.state.oldPage + '"]').forEach((anchor) => {
                        anchor.className = 'active'
                    })

                    return false
                } else {

                    $('anchor[path="' + newPage + '"]').forEach((anchor) => {
                        anchor.className = 'active'
                    })

                }

                let state = {
                    oldPage: history.state ? history.state.newPage : '',
                    newPage: newPage,
                    targetContainer: targetContainer,
                    transitionStart: transitionStart,
                    transitionEnd: transitionEnd,
                    closeDrawer: closeDrawer
                }

                // push to history
                history.pushState(state, (newPage != state.oldPage) ? newPage : state.oldPage, (newPage != '' ? '?' : '') + newPage)

                // force popstate fire event
                window.dispatchEvent(new PopStateEvent('popstate', { state: state }))

            }

        },


        /**
         * Anchor component - <anchor path="path/to/file"> blah </anchor>
         */
        anchor: {

            initialize: () => {

                let anchors = $('anchor')

                anchors.forEach((anchor) => {
                    apper.component.anchor.construct(anchor)
                })

            },

            construct: (element) => {

                // if already initialized
                if (element.hasAttribute('initialized'))
                    return false

                let path = element.getAttribute('path')
                let targetContainer = element.getAttribute('target') || 'content'
                let transitionStart = element.getAttribute('transitionStart') || []
                let transitionEnd = element.getAttribute('transitionEnd') || []
                let closeDrawer = element.hasAttribute('closeDrawer') || "true"

                element.addEventListener('click', (e) => {

                    apper.component.anchor.active(element)

                    apper.component.navigator.navigate(path, targetContainer, transitionStart, transitionEnd, closeDrawer)
                })

                if (utils.isIOS) {

                    element.touchmove = false

                    element.addEventListener('touchmove', (e) => {
                        element.touchmove = true
                    })

                    element.addEventListener('touchend', (e) => {

                        e.preventDefault()

                        if (!element.touchmove) {

                            apper.component.anchor.active(element)

                            apper.component.navigator.navigate(path, targetContainer, transitionStart, transitionEnd, closeDrawer)
                        }

                        element.touchmove = false
                    })

                } else {

                    element.addEventListener('touchend', (e) => {

                        e.preventDefault()

                        apper.component.anchor.active(element)
                        apper.component.navigator.navigate(path, targetContainer, transitionStart, transitionEnd, closeDrawer)

                    })

                }

                element.setAttribute('initialized', '')

            },

            active: (element) => {

                $('anchor.active').forEach((activeAnchor) => {
                    activeAnchor.className = ''
                })
                $('anchor[path="' + element.getAttribute('path') + '"]').forEach((activeAnchor) => {
                    activeAnchor.className = 'active'
                })

            }
        }
    }

}
