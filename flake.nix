{
  description = "Flake for the scrumdapp web client";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = (import nixpkgs) { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          name = "Scrumdapp web-client shell";
          buildInputs = with pkgs; [
            nodejs
            docker
          ];

          shellHook = ''
            npm config set ignore-scripts true
            npm install
            echo ""
            echo "Node : `node --version`"
            echo "Npm : `npm --version`"
            echo "
            Welcome to the Scrumdapp web-client shell 🚀!
            ";
          '';
        };
      }
    );
}
