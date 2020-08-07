function main(splash, args)
    assert(splash:go(args.url))
    while not splash:select('.price-current') do
        splash:wait(0.1)
    end
    return {
        html = splash:html()
    }
end