import { Entry } from './entry';
const maxScopeLen = 3;
const maxNameLen = 6;

export class Log {

  private parent: Log;

  private name = 'unknwn';
  private scope = 'tdo';

  public entries = new Array<Entry>();

  /**
   * Create a logger and optionally attach it to a parent logger
   * @param string name this logger should use
   * @param Log optional parrent logger to attach to
   * @param string optional initial message to log
   */
  constructor(name: string, parent? : Log, initialMessage? : string) {
    this.rename(name);
    this.linkTo(parent);
    if (initialMessage != null)
      this.add(initialMessage);

    this.id = 'xx';// Guid.NewGuid().ToString().Substring(0, 2);
  }


  private id:string;

  private identifier = (): string => this.scope + this.name + this.id;

  public fullIdentifier = (): string => this.parent.fullIdentifier() + this.identifier();


  public rename(name: string) : void
  {
    try {
      var dot = name.indexOf(".");
      this.scope = dot > 0 ? name.substr(0, Math.min(dot, maxScopeLen)) + "." : "";
      var rest = dot > 0 ? name.substr(dot + 1) : name;
      this.name = rest.substr(0, Math.min(rest.length, maxNameLen));
      this.name = this.name.substr(0, Math.min(this.name.length, maxNameLen));
    }
    catch (e) {
       /* ignore */
    }
  }

  public linkTo(parent: Log): void {
    this.parent = parent || this.parent; // if new parent isn't defined, don't replace
  }

  public add(message:string): string
  {
    this.addEntry(new Entry(this, message));
    return message;
  }

  private addEntry(entry: Entry): void
  {
    this.entries.push(entry);
    if (this.parent)
      this.parent.addEntry(entry);
  }



}