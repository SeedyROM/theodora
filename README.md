# Theodora 📖


# todo
- angular front-end
  - table of contents
    - pull all headings
    - text field for filtering
  - file list
    - list all md files in the folder, indented by folder structure, https://www.npmjs.com/package/angular-tree-view
    - use each file's #title, this lets us have pretty text to show without having to worry about special characters in the file name
    - text field for filtering
  - buttons to show/hide table of contents and file list, like Typora or Write Monkey 3
  - history, location in the folder structure (although your location is already in the url)
  - better looking scrollbar: https://codepen.io/akinjide/pen/BpggrZ
- serve any non-markdown files statically (images, pdfs, etc)
- git integration
  - able to do a sparse checkout
  - run periodically, set up cron in ubuntu
  - delete and re-clone, rather than pulling
- store settings in a json file rather than a database
  - the app will be easier to install
  - it'll be human-editable
- simple admin page, site.com/admin
  - prompt for login / password before showing settings
  - store admin/password in hidden fields to validate before saving
  - url for git repo, git credentials for cloning
  - button for refreshing repo
  - css, theme
- themes folder, separate css files
  - allow admins to set a default theme
  - allow admins the to allow users to pick their own theme
  - when a user selects a theme, store in a cookie
- docs
  - setting up a cron in ubuntu
  - installation guide
    - setting up a repo
    - creating a virtual server (digital ocean + ubuntu)
    - installing and configuring theodora

# maybe
- css/theme editor
- user and login system
  - admin and editor roles
  - admins can add/remove/edit users and change site settings
- markdown editor
  - store git credentials with user
  - commit + push every time a file is edited
