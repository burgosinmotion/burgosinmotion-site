# Storyline demos

The interactive demos are listed in `public/scorm/actividades.json`. Each entry contains:

- `id`: unique identifier.
- `title`: label shown in the demo selector.
- `details`: short description shown above the activity.
- `poster`: preview image path, relative to the `public` folder.
- `src`: path to the published Storyline `story.html`, relative to `public`.

To use a custom thumbnail, put the image in `public/scorm/portadas/` and set `poster` to its path, for example `/scorm/portadas/actividad-demo-03.png`. To add a demo, publish it for Web, copy the complete export into its own folder under `public/scorm/`, then add an entry to the JSON with its `story.html` and poster paths. Deploy the website to publish changes.