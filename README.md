
Resource Agnostic Components and UI
------------------------------------------------------------------------

#### Description
The aim of this mod is to make all JS Simulation Components and game UI
resource agnostic - that is to say, that they do not have the game's
resources hard-coded into them.

This is so that modders can add/remove resources easily and without
having to modify the simulation or GUI code.

#### Installation
1. Acquire zip from GitHub (button marked "Download ZIP")
2. Move to your mods folder, default locations are:
   - Linux   : ~/.local/share/0ad/mods
   - OSX     : ~/Library/Application\ Support/0ad/mods
   - Windows : "Documents" or "My Documents" Folder => My Games\0ad\mods\
3. Unzip archive
4. Rename the resulting folder to "ResourceAgnostic"
5. Start 0AD
6. From main menu, "Tools & Options" > "Mod Selection"
7. Select "ResourceAgnostic" from upper section
8. Press buttons captioned with "Enable", "Save Configuration", and then
   "Start Mods" in that order

#### Scripting Notes
To add an new resource:

1. Copy one of the currently existing resources in
   `simulation/data/resources` and amend as needed.
2. Provide two icons, in the form of `{res}.png` and `{res}_small.png`, and
   place them in `art/textures/ui/session/icons/resources`
3. Amend `gui/common/setup_resources.xml` so that you can use
   `[icon={res}]` in game UI texts.

And your new resource is now usable for tribute, loot or barter.

To permit gathering this new resource:

1. You'll need to supply two cursors, in the form `action-gather-{res}`
   and `action-return-{res}`, and place them in `art/textures/cursors`.
   They get included automagically.
2. Then to the units (or their parent templates) doing the gathering,
   add a gather rate `ResourceGatherer/Rates/{res}` and a capacity
   `ResourceGatherer/Capacities/{res}`.
3. And to create a dropsite, add the resource code to a structure's
   `ResourceDropsite/Types`.
4. Lastly, you'll have to modify the `art/actor` xml files of *all* the
   actors of *all* the units you wish to gather this new resource so as 
   to tell the game which animations and props to use on units for
   gathering and returning with your new resource. Every civ that has
   that unit, every promotion level.

To remove a resource:

1. Add `.DELETED` to the end of the resource's JSON file. That's it.

Please note that the GUI only has space for eight resources maximum. Any
more will cause errors.

To use this mod as a dependancy of your mod, add `"ResourceAgnostic>=0.1"`
to the `dependencies` attribute of your mod's `mod.json`.

#### Known Issues
* You have to modify `gui/common/setup_resources.xml` in a not-very-mod-
  friendly fashion.
* You have to modify `art/actor` and `simulation/template` xml files in
  a *seriously*-not-very-mod-friendly fashion.
* The text on resources in the barter/market UI is partly obscured when
  prices reach four digits.

#### Credits
Thanks go to the main development team at Wildfire Games, the
independent teams working on modifying and expanding the game, not to
mention all the volunteers and members of the further community.

#### License
The XML files within this work are based on work and examples by
Wildfire Games, and are available under the Creative Commons Attribution
ShareAlike 3.0 license. Details may be found at
http://creativecommons.org/licenses/by-sa/3.0/

The scripting and everything else contained within this work is
released under the GPLv2+ license. Details may be found at
http://opensource.org/licenses/GPL-2.0
