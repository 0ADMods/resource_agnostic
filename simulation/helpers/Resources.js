/**
 * Resource handling helper script
 *
 */

var Resources = {};

/**
 * Returns an object containing all readable resource data
 */
Resources.LoadData = function()
{
	this.resourceData = {};
	var jsonFiles = Engine.FindJSONFiles("resources", false);
	
	for (let filename of jsonFiles)
	{
		let data = Engine.ReadJSONFile("resources/"+filename+".json");
		if (!data)
			continue;

		this.resourceData[data.code] = data;
	}
	return this.resourceData;
};

Resources.GetAllData = function()
{
	if (!this.resourceData)
		return this.LoadData();
	else
		return this.resourceData;
};

Resources.GetResource = function(type)
{
	var data = this.GetAllData();
	type = type.toLowerCase();
	
	return data[type] || false;
};

/**
 * Returns an array of codes belonging to the resources
 */
Resources.GetCodes = function()
{
	return Object.keys(this.GetAllData());
};

Engine.RegisterGlobal("Resources", Resources);
