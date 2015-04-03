function ResourceTrickle() {}

ResourceTrickle.prototype.Schema = 
	"<a:help>Controls the resource trickle ability of the unit.</a:help>" +
	"<element name='Rates' a:help='Trickle Rates'>" +
		"<oneOrMore>" +
			"<element a:help='Quantity of a Resource given to the player every interval'>" +
			    "<anyName/>" +
				"<ref name='nonNegativeDecimal'/>" +
			"</element>" +
		"</oneOrMore>" +
	"</element>" +
	"<element name='Interval' a:help='Number of miliseconds must pass for the player to gain the next trickle.'>" +
		"<ref name='nonNegativeDecimal'/>" +
	"</element>";

ResourceTrickle.prototype.Init = function()
{
	// Call the timer
	var cmpTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer);
 	cmpTimer.SetInterval(this.entity, IID_ResourceTrickle, "Trickle", this.GetTimer(), this.GetTimer(), undefined)
};

ResourceTrickle.prototype.GetTimer = function()
{
	var interval = +this.template.Interval;
	return interval;
};

ResourceTrickle.prototype.GetRates = function()
{
	var ret = {};
	var resCodes = Resources.GetCodes();
	for (let res in this.template.Rates)
	{
		res = res.toLowerCase();
		if (resCodes.indexOf(res) < 0)
			continue;
		
		ret[res] = ApplyValueModificationsToEntity("ResourceTrickle/Rates/"+res, +this.template.Rates[res], this.entity);
	}
	
	return ret;
};

// Do the actual work here
ResourceTrickle.prototype.Trickle = function(data, lateness)
{
	var cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
	if (cmpPlayer)
		cmpPlayer.AddResources(this.GetRates());	
};

Engine.RegisterComponentType(IID_ResourceTrickle, "ResourceTrickle", ResourceTrickle);
