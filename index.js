function formatProfile({entry}) {
    /*
    {
        "id": "87364481",
        "hash": "be6b80ebb65da1d1e5b17e0cc2b286cd",
        "requestHash": "be6b80ebb65da1d1e5b17e0cc2b286cd",
        "profileUrl": "http://gravatar.com/syblackwell",
        "preferredUsername": "syblackwell",
        "thumbnailUrl": "https://secure.gravatar.com/avatar/be6b80ebb65da1d1e5b17e0cc2b286cd",
        "photos": [
            {
                "value": "https://secure.gravatar.com/avatar/be6b80ebb65da1d1e5b17e0cc2b286cd",
                "type": "thumbnail"
            }
        ],
        "name": {
            "givenName": "Simon",
            "familyName": "Blackwell",
            "formatted": "Simon Blackwell"
        },
        "displayName": "AnyWhichWay",
        "urls": []
    }
     */
    const profile = entry[0],
        self =  window.formatProfile.context;
    self.setAttribute("profile",JSON.stringify(profile));
    const gravatar =  self.shadowRoot.getElementById("gravatar") || quickComponent.createElement("div",{id:"gravatar"},self.shadowRoot);
    gravatar.innerHTML = `<img style="float:left" src="${profile.thumbnailUrl}"/>`;
    const fragment = document.createElement("div");
    if(window.formatProfile.showProfile) {
        fragment.innerHTML = Function("profile","with(profile) { return `" +  self.innerHTML + "`}")(profile);
        const lines = fragment.textContent.split("\n").length;
        requestAnimationFrame(() => {
            const img = self.shadowRoot.querySelector("img");
            img.style.height = (parseFloat(window.getComputedStyle(self).fontSize) * lines) + "px";
            self.style.verticalAlign = "middle";
        });
    } else {
        fragment.innerHTML = self.innerHTML;
        requestAnimationFrame(() => {
            const img = self.shadowRoot.querySelector("img");
            img.style.height = window.getComputedStyle(self).fontSize;
            self.style.verticalAlign = "middle";
        });
    }
    while(fragment.firstChild) gravatar.appendChild(fragment.firstChild);
    self.dispatchEvent(new Event("loaded"));
}

self.reactive({attributes:["email","hash","username","showprofile"]})
self.properties({
    render() {
        window.formatProfile = formatProfile.bind(this);
        let hash = this.getAttribute("hash");
        if(!hash) {
            const email = this.getAttribute("email");
            hash = email ? md5(email.trim().toLowerCase()) : this.getAttribute("username") || "";
        }
        window.formatProfile.showProfile = this.hasAttribute("showprofile") && this.getAttribute("showprofile")!=="false";
        window.formatProfile.context = this;
        if(window.formatProfile.showProfile ||  this.hasAttribute("username") || !this.shadowRoot.getElementById("gravatar")) {
            const script = this.shadowRoot.querySelector('script[id="getprofile"]');
            if(script) {
                const newscript = script.cloneNode(true),
                    url = new URL(script.src);
                newscript.src = `${url.origin}${url.pathname}?callback=formatProfile&${Math.random()}`;
                script.replaceWith(newscript);
            } else {
                quickComponent.createElement("script",{id:"getprofile",src:`https://www.gravatar.com/${hash}.json?callback=formatProfile`},this.shadowRoot);
            }
        }
    }
})