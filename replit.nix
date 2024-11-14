{pkgs}: {
  deps = [
    pkgs.glibcLocales
    pkgs.lsof
    pkgs.nodejs
    pkgs.nodePackages.typescript-language-server
    pkgs.postgresql
  ];
}
