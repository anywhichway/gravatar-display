# gravatar-display
A web component for displaying Gravatars

# Usage

`@anywhichway/gravatar-display` is designed to be loaded and used from a CDN like https://www.jsdelivr.com. It is also designed
to be loaded and instantiated by `@anywhichway/quick-component`.

Insert this line into your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@anywhichway/quick-component.js" component="https://cdn.jsdelivr.net/npm/@anywhichway/gravatar-display@0.0.1"></script>
```

Version numbers are used above to insulate your use from unexpected changes due to future enhancements. You can also use
the most recent version of the software with the code below:

```html
<script src="https://cdn.jsdelivr.net/npm/@anywhichway/quick-component.js" component="https://cdn.jsdelivr.net/npm/@anywhichway/gravatar-display"></script>
```

After this you can include the tag `<gravatar-display>` in your HTML.

# Configuration

`<gravatar-display>` is configured using attributes `email`,`hash`,`username`,`showprofile`. You only need to provide one of `email`, `hash`, or `username`.

If you set `showprofile` to `true`. You can place an HTML template inside the tag that is used for displaying profile data, e.g.

```html
<gravatar-display>
    <div style="float:right">${name.formatted}<br>${displayName}</div>
</gravatar-display>
```

The available data takes the form:

```json
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
```


